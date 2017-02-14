1) Assumption:
  - As prerequisite for Running the project I assume you have already experience installing ruby on rails projects, because it will be hard to cover details over the basic steps.
  - you already know how to install a ruby version on your system, anyway I give you a recommendation to go with rvm. 

1) Installation Instructions:
  a) I recommend to install the project using rvm, you can checkout the rvm installation instructions here: https://rvm.io/rvm/install

  b) If you have rvm installed, cd into the root application directory and install the ruby version specified in the .ruby-version

  c) After installing ruby ruby-2.2.6, cd into the root application directory again and run the command: bundle install

  d) Make sure 'bundle install' success, if you have problems with nokogiri gem, checkout nokogori installation troubleshooting page: http://www.nokogiri.org/tutorials/installing_nokogiri.html

  e) If you don't have RVM, make sure you have ruby version 2.2.6 and your bundle install command success. 

  f) You need a mysql database  running in your localhost and a mysql root user with no password.

  g) run 'npm install' inside the root application directory that resides into the Code directory.

  h) install karma-cli globally this way: npm install -g karma-cli


2) Database and seed data:
  a) Make sure you have mysql database running in your localhost and a mysql root user with no password.
  b) Inside the rails app directory run the command: rake db:create
  c) After step b) success, run the command: rake db:migrate
  d) Then, run the command: rake db:seed
     your database schema and tables are now setup along with some seed data.
 
3) Requirements:
  - you will need a linux or mac osx machine. since the project is not for Windows operating sytem. 
  - make sure ruby 2.2.6 sucess and you have the required environment for having nokogiri gem installed along with the default rails 5 required gems system dependencies. Making bundle install success is your responsability since additional gems I added into the Gemfile don't require you to install custom libraries.
  - make sure you have node js >= 3.10.3
  - make sure you have npm >= 3.10.3

4) Start the project:
  a) If You have take into account all the previous steps, you just need to run the command:
    foreman start

  b) Wait until foreman start does not add more log messages into your terminal

  c) Go into any web browser, preferably chrome, since at this stage the project is tested on Chrome Version 55.0.2883.95 (64-bit)

  d) Type into your browser the following address and press enter: localhost:5000

  e) What you will see if you have not signed in or signed up is the Customers portal. feel free to signup. or login with: customer@ymail.com and password: customer123 (Make sure you have run step (2) point (d) )

  f) If you want to review the admin site, logout from your the app through "my account" link and then, go to this url: localhost:5000/admin_users
     You can access the admin panel with this credentials: admin@support.com and password: admin123


5) Running the Test suite:
  a) for running the Back-end tests suite, you need to make sure the command 'rake db:create RAILS_ENV=test' success, next run: rake db:create RAILS_ENV=test
  b) inside the root application directory run the command: rspec spec
  c) for running the Front-end test suite, you need to run: karma start