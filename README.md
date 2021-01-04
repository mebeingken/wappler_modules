# Wappler Modules
Custom Modules used to extend Wappler - See associated MIT License

## Custom Authentication
Used to enable two-factor authentication using Google Authenticator app

### PHP Installation
Install Composer - https://getcomposer.org/doc/00-intro.md

Install PHP library for Two Factor Authentication
Copyright (c) 2014-2015 Rob Janssen

    composer require robthree/twofactorauth

Copy custom_authentication.hjson and custom_authentication.php to the extensions/server_connect/modules folder in your project folder (create these folders if necessary)

Restart Wappler

### Node Installation

Install the speakeasy package from within Wappler

Copyright (c) 2012-2016 Mark Bao <mark@markbao.com> Copyright (c) 2015 Michael Phan-Ba <michael@mikepb.com> Copyright (c) 2011 Guy Halford-Thompson <guy@cach.me> )
    
    npm i speakeasy

Install the qrcode package from within Wappler

Copyright (c) 2012 Ryan Day

    npm i qrcode

Copy custom_authentication.hjson and custom_authentication.js to the extensions/server_connect/modules folder in your project folder (create these folders if necessary)

Restart Wappler

## Custom File Actions

### Node/PHP Installation
Copy custom_file_actions.hjson and cutom_file_actions.[php | js] to the extensions/server_connect/modules folder in your project folder (create these folders if necessary)
