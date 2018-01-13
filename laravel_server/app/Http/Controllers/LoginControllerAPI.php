<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


    define('YOUR_SERVER_URL', 'http://memorygame.app/');
    // Check "oauth_clients" table for next 2 values: 
    define('CLIENT_ID', '2'); 
    define('CLIENT_SECRET','IGwJXlcYrwBXgxWxjvHF85HGxWgx4a5OROZUwFRf');

    class LoginControllerAPI extends Controller {
    
        public function login(Request $request) {
                
                $http = new \GuzzleHttp\Client;
                $response = $http->post(YOUR_SERVER_URL.'/oauth/token', 
                ['form_params' => ['grant_type' => 'password', 'client_id' => 
                CLIENT_ID, 'client_secret' => CLIENT_SECRET, 'username' => $request->email,
                'password' => $request->password, 'scope' => ''],'exceptions' => false, ]);
                $errorCode= $response->getStatusCode(); if ($errorCode=='200') {
        return json_decode((string) $response->getBody(), true); } else {
        return response()->json(['msg'=>'User credentials are invalid'], $errorCode);
        } 
        }

        public function logout() {
            \Auth::guard('api')->user()->token()->revoke(); 
            \Auth::guard('api')->user()->token()->delete();
            return response()->json(['msg'=>'Token revoked'], 200);
        }

        public function validateToken(Request $request, $localCall = false) {
     
           $psr = (new DiactorosFactory)->createRequest($request);
   
           try {
               $psr = $this->server->validateAuthenticatedRequest($psr);
   
            
               $token = $this->tokens->find(
                   $psr->getAttribute('oauth_access_token_id')
               );
   
               $currentDate = new DateTime();
               $tokenExpireDate = new DateTime($token->expires_at);
   
               $isAuthenticated = $tokenExpireDate > $currentDate ? true : false;
   
               if(isAuthenticated) {
                   return true;
               }
               else {
                    return false;
                    //return json_encode(array('authenticated' => $isAuthenticated));
               }
           } catch (OAuthServerException $e) {
             
           }


    }
}
