#!/bin/sh

openssl aes-256-cbc -salt -in $1 -out encrypted.out

echo "File at $1 encrypted to file: encrypted.out"

echo "To upload encrypted file to IPFS please ensure that your IPFS Daemon is running and run the following command:"

echo "ipfs add ./encrpyted.out"

