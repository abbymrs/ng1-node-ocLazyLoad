const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'node_modules')));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log('express server is running on port ' + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

let user = {
    name: 'abby',
    psd: '123',
    isLogin: false
};
app.post('/login', (req, res) => {
    console.log(req.body);

    let obj = {
        content: {
            msg: '',
            isLogin: false
        },
        status: -1
    };
    if (req.body.username == user.name && req.body.psd == user.psd) {
        obj = {
            content: {
                msg: '登录成功',
                isLogin: true
            },
            status: 1
        };
        user.isLogin = true;
    } else {
        obj = {
            content: {
                msg: '用户名或者密码错误',
                isLogin: false
            },
            status: 0
        };
        user.isLogin = false;
    }
    res.send(obj).end();
});

app.get('/message', (req, res) => {
    let obj = {
        isLogin: false
    };
    if(user.isLogin == true){
        obj.isLogin = true;
    }
    res.send(obj).end();
});

app.get('/logout', (req, res) => {
    user.isLogin = false;
    res.send().end();
});