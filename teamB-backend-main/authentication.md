# APIs for registration
```
Registration (POST method): {LOCALHOST}/api/auth/register

Login (POST method): {LOCALHOST}/api/auth/login

```

# BasicAuth (READ BEFORE PROCEED TO "How to use")
```
BasicAuth use a Base64 encoder/decoder system, in real practice, the input information will be encoded in the front end before sending an authorization request to the back end, in order to do this, we have to encode the inputs first. The following describes the flow:

    - User input email and password in

    - The hook/business logic take this information 
      and turn it into a buffer string => {email:password}

    - The buffer string is encoded use Base64 encoder,
       (for debugging and testing, use https://www.base64encode.org/)

    - A request will be built with a custom header and input body (login info), where the header looks like this => Authorization: Basic ${encoded buffer string}

    - Data is sent to the backend for verfication

    - Return result and proceed to next function/page 

For example: 
    Email input is "email@example.com"
    Password input is "password"  

    The buffer string should be  "email@examplecom:password"
    
    Header should be "Authorization: Basic ZW1haWxAZXhhbXBsZS5jb206cGFzc3dvcmQ="

Note: the info in the buffer string should match the body

```
# How to use 
main tool if no front end function yet: Postman
```
For registration:
    - send a POST method with the following body:
    {
        
    "email": "{Your email here}",
    "password": "{Your password here}",
    "username": "{Your username here}",
    "role": "{Your role here}"

    }
    
    Expected output: return a json with a message that says "Registration successfully"

For login:
    - send a POST method with the an additional header and body:
        the header should look like this => 
        Authorization: Basic <encoded-credentials>
 

    body: {
    "email": "{Your email here}",
    "password": "{Your password here}",
    }

     Expected output: return a json with a message that says "Login successfully"
```