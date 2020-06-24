gen_proto:
	retool do protoc --proto_path=$GOPATH/src:. --twirp_out=../../ --go_out=. ./proto/helloworld/helloworld.proto
	protoc --twirp_typescript_out=./src/frontend ./proto/helloworld/helloworld.proto
