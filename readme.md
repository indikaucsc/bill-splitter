/*
 *  DIGITALX LABS(PVT)LTD PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 * 
 *  Copyright © 2019. DIGITALX LABS(PVT)LTD
 *  All Rights Reserved.
 * 
 *  NOTICE:  All information contained herein is, and remains
 *  the property of DIGITALX LABS(PVT)LTD.  The intellectual and technical concepts contained
 *  herein are proprietary to DIGITALX LABS(PVT)LTD.
 *  Dissemination of this information, reproduction of this material, and copying or distribution of this software
 *  is strictly forbidden unless prior written permission is obtained from DIGITALX LABS(PVT)LTD.
 */




# Lucky-one-API

#### create migrations
`npx sequelize-cli migration:generate --name create-< name of the table >`

#### migrations
run `db:migrate-all` script in package.json or `npx sequelize-cli db:migrate` command

#### create seeder
`npx sequelize-cli seed:generate  --name seed-< name of the table >`

#### all seeds
run `db:seed-all` script in package.json or `npx sequelize-cli db:seed:all` command

#### sample Postman collection for test endpoints
https://www.getpostman.com/collections/24275412b1fef49e6af8
