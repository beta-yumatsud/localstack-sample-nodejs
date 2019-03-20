const express = require('express');
const AWS = require('aws-sdk');
const todo = require('./libs/todo');
const app = express();

// API的なやつ
app.get('/v1/todo', (req, res) => {
    const todoList = [
        {title: "Create Node.js sample application", optional: false},
        {title: "Create test code Node.js sample", optional: true},
        {title: "Create Docker container with Node.js", optional: false},
        {title: "Create docker-compose with localStack", optional: false}
    ];
    console.log(todo.countOptionals(todoList));
    res.json(todoList)
});
app.get('/v1/todo/:id', (req, res) => {
    const todoList = [
        {title: "Create Node.js sample application", optional: false},
        {title: "Create test code Node.js sample", optional: true},
        {title: "Create Docker container with Node.js", optional: false},
        {title: "Create docker-compose with localStack", optional: false}
    ];
	const todoItem = {id: req.params.id, title: "Create Node.js sample application", optional: false};
    console.log(todoItem);
    res.json(todoItem)
});

// AWS S3
// TODO endpointのhost名は環境によって使い分ける必要あり
AWS.config.update({
    accessKeyId: "your access key id",
    secretAccessKey: "your secret access key",
    s3: { endpoint: "http://<<your container name>>:4572" },
    s3ForcePathStyle: true
});
const s3 = new AWS.S3();
const bucketName = 'localstack-sample';
const objectKey = 'localstack-key';

app.post('/v1/memo', (req, res) => {
    const message = 'Sample localstack with Node.js';

    s3.createBucket( { Bucket: bucketName }, (err, data) => {
        if (err !== null) {
            console.log(err);
            return
        }
        s3.putObject( { Bucket: bucketName, Key: objectKey, Body: message }, (err, data) => {
            if (err !== null) {
                console.log(err);
                return
            }
            s3.getObject( { Bucket: bucketName, Key: objectKey }, (err, data) => {
                if (err !== null || data === null) {
                    console.log(err);
                    return
                } else {
                    const result = {result: data.Body.toString()};
                    res.json(result)
                }
            })
        })
    })
});

app.get('/v1/memo', (req, res) => {
    s3.getObject( { Bucket: bucketName, Key: objectKey }, (err, data) => {
        if (err !== null || data === null) {
            console.log(err)
        } else {
            const result = {result: data.Body.toString()};
            res.json(result)
        }
    })
});

app.listen(3000, () => console.log("bootstrap nodejs server. listen port 3000"));
