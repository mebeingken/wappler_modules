<?php

namespace modules;

use \lib\core\Module;

class custom_authentication extends Module
{
  public function gen_key($options, $name) {
    // https://github.com/RobThree/TwoFactorAuth

    // get dynamic values
    $appName = $this->app->parseObject($options->applicationName);


    // setup the response object  
    $response = new \StdClass;

    // Create a TwoFactorAuth instance
    require '../../vendor/autoload.php';
    $tfa = new \RobThree\Auth\TwoFactorAuth($appName);

    // gen secret
    $secret = $tfa->createSecret();

    // gen qr url
    $dataURL = $tfa->getQRCodeImageAsDataUri('', $secret); 

    // set the response values
    $response->secret = $secret;
    $response->dataURL = $dataURL;

    // return respons
    return $response;

  }

    public function verify_token($options, $name) {
      //https://github.com/RobThree/TwoFactorAuth

      // get dynamic values
      $user_token = $this->app->parseObject($options->user_token);
      $secret = $this->app->parseObject($options->secret);

      // setup the response object  
      $response = new \StdClass;

      // Create a TwoFactorAuth instance
      require '../../vendor/autoload.php';
      $tfa = new \RobThree\Auth\TwoFactorAuth();



      // Verify code
      $result = $tfa->verifyCode($secret, $user_token);

      // set the response values
      $response->valid_token = $result;

      //return $this->app->parseObject($options->value);
      // return respons
      return $response;

  }
}


?>
