const app = require('./app')
const port = 2109;
const {sequelize} = require('./src/database/database');

sequelize
.authenticate()
.then(()=>{
    console.log('connect database is successfully');
})
.catch(()=>{
    console.log('connect database fail');
})
app.listen(port,()=>{
    console.log('server is running');
})
