# bill-splitter-api
Simple Bill Splitter Application using nodejs

## Requirements

For development, you will  need Node.js  installed in your environment.


If the installation was successful, you should be able to run the following command.

    $ node --version
    v9.11.2

    $ npm --version
    6.11.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###


## Install

    $ git clone https://github.com/indikaucsc/bill-splitter.git
    $ cd bill-splitter
    $ npm install
   

## Running the project

   $ npm start
   
## Change Running port
  Under the project directory, You can see .env file , then you can change APP_PORT
 
## Setup instructions to host the app with pm2

  If you have not pm2 install in your server, Please refer the steps https://pm2.keymetrics.io/docs/usage/quick-start/
 
     $ pm2 start npm --name "bill-splitter-api" -- start
     
     
## Api request  
url : http://localhost:4001/api/v1/bill/settlements
method : post
Content-Type : application/json

    {"data": [ {
        "day": 1,
        "amount": 120,
        "paid_by": "A",
        "friends": ["A ", "B", "C"]

    },
    {
        "day": 2,
        "amount": 120,
        "paid_by": "B",
        "friends": ["A", "B", "A"]
    },{
        "day": 3,
        "amount": 120,
        "paid_by": "C",
        "friends": ["A", "B", "C"]
    }  
     ]}

   
    

## Suggest Enhancements 

### Simplicity.
Should be developed web app or mobile app for tracking expenses sync to backend side, better to sync single transactions.

New feature to maintain profile managing.

Add more mearing full optional inputs like date time , remark ...

New feature to give view transaction history with filtering options (within given date range).

Add notification and reminders for owes.


### Maintainability
Use CI/CD pipeline for releases (jenkins, Docker, kubernetes).

### Performance
We can use aws lambda serverless architecture for that.

Add monitoring tools (new relic, could watch, elk apm).

Add proper logs library and using proper format (bunyan logger, winston logger).

Design Database and maintain, managing large amount of requests.

