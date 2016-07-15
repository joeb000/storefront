#!/bin/sh

echo "https://ipfs.io/ipfs/$1"
curl -o terms_encrypted.aes "https://ipfs.io/ipfs/$1"

echo "Downloaded encrypted file: terms_encrypted.aes"
echo "attempting to decrypt..."
openssl aes-256-cbc -d -in terms_encrypted.aes -out terms.txt
echo " "
echo "Decrypted terms file available at ./terms.txt"

