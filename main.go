package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	pb "github.com/nozo-moto/twirp-go-typescript/proto/helloworld"
	"github.com/twitchtv/twirp"
)

var ctxKey struct{}

type HelloWorldServer struct{}

func (s *HelloWorldServer) Hello(ctx context.Context, req *pb.HelloReq) (resp *pb.HelloResp, err error) {
	return &pb.HelloResp{Text: "Hello " + req.GetSubject()}, nil
}

func main() {
	hook := LoggingHooks(os.Stderr)

	handler := pb.NewHelloWorldServer(&HelloWorldServer{}, hook)
	mux := http.NewServeMux()
	mux.Handle(pb.HelloWorldPathPrefix, handler)
	http.ListenAndServe(":8080", mux)
}

func LoggingHooks(w io.Writer) *twirp.ServerHooks {
	return &twirp.ServerHooks{
		RequestReceived: func(ctx context.Context) (context.Context, error) {
			startTime := time.Now()
			ctx = context.WithValue(ctx, ctxKey, startTime)
			return ctx, nil
		},
		RequestRouted: func(ctx context.Context) (context.Context, error) {
			svc, ok := twirp.ServiceName(ctx)
			if !ok {
				return ctx, errors.New("service name failed")
			}
			meth, ok := twirp.MethodName(ctx)
			if !ok {
				return ctx, errors.New("method name failed")
			}
			fmt.Fprintf(w, "received req svc=%q method=%q\n", svc, meth)
			return ctx, nil
		},
		ResponseSent: func(ctx context.Context) {
			startTime := ctx.Value(ctxKey).(time.Time)
			svc, _ := twirp.ServiceName(ctx)
			meth, _ := twirp.MethodName(ctx)
			fmt.Fprintf(w, "response sent svc=%q method=%q time=%q\n", svc, meth, time.Since(startTime))
		},
	}
}
