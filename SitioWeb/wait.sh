#!/bin/bash
x=20
while [ $x -gt 0 ]
do
sleep 1s
clear
echo "$x seconds until blast off"
x=$(( $x - 1 ))
done
go run main.go