# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\login.spec.js >> Login Test
- Location: tests\login.spec.js:4:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /SearchHotel/i
Received string:  "https://adactinhotelapp.com/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html xmlns="http://www.w3.org/1999/xhtml">…</html>
       - unexpected value "https://adactinhotelapp.com/"

```

```yaml
- table:
  - rowgroup:
    - 'row "AdactIn Group Adactin Group: Hotel Reservation System"':
      - cell "AdactIn Group":
        - img "AdactIn Group"
      - 'cell "Adactin Group: Hotel Reservation System"':
        - 'img "Adactin Group: Hotel Reservation System"'
    - row:
      - cell
- table:
  - rowgroup:
    - 'row "Adactin Launches The Adactin Hotel App! Hotel Image 3 The best Free learning platform for Software Testing Now available to download for free on IOS and Android. Existing User Login - Build 1 Username Password Forgot Password? Invalid Login details or Your Password might have expired. Click here to reset your password Login New User Register Here Important Note: Hotel Application has 2 builds: Build 1 Has been developed with known defects. Thus, functional test cases and automation scripts will fail on this build. Build 2 Known defects have been fixed. Thus, functional test cases and automation test scripts should pass when executed on this build. Go to Build 2 For any queries/issues please email: info@adactin.com"':
      - cell "Adactin Launches The Adactin Hotel App! Hotel Image 3 The best Free learning platform for Software Testing Now available to download for free on IOS and Android.":
        - paragraph: Adactin Launches The Adactin Hotel App!
        - table:
          - rowgroup:
            - row "Hotel Image 3":
              - cell "Hotel Image 3":
                - img "Hotel Image 3"
            - row "The best Free learning platform for Software Testing Now available to download for free on IOS and Android.":
              - cell "The best Free learning platform for Software Testing Now available to download for free on IOS and Android."
        - table:
          - rowgroup:
            - row:
              - cell:
                - link:
                  - /url: https://testflight.apple.com/join/Ai3nVPMD
                  - img
              - cell:
                - link:
                  - /url: https://play.google.com/store/apps/details?id=com.adactin.education.hotelbooking
                  - img
      - 'cell "Existing User Login - Build 1 Username Password Forgot Password? Invalid Login details or Your Password might have expired. Click here to reset your password Login New User Register Here Important Note: Hotel Application has 2 builds: Build 1 Has been developed with known defects. Thus, functional test cases and automation scripts will fail on this build. Build 2 Known defects have been fixed. Thus, functional test cases and automation test scripts should pass when executed on this build. Go to Build 2 For any queries/issues please email: info@adactin.com"':
        - table:
          - rowgroup:
            - row "Existing User Login - Build 1":
              - cell "Existing User Login - Build 1"
            - row "Username":
              - cell "Username"
              - cell:
                - textbox
            - row "Password":
              - cell "Password"
              - cell:
                - textbox
            - row "Forgot Password?":
              - cell
              - cell "Forgot Password?":
                - link "Forgot Password?":
                  - /url: ForgotPassword.php
            - row "Invalid Login details or Your Password might have expired. Click here to reset your password":
              - cell
              - cell "Invalid Login details or Your Password might have expired. Click here to reset your password":
                - text: Invalid Login details or Your Password might have expired.
                - link "Click here":
                  - /url: http://adactinhotelapp.com/ForgotPassword.php
                - text: to reset your password
            - row "Login":
              - cell
              - cell "Login":
                - button "Login"
            - row "New User Register Here":
              - cell "New User Register Here":
                - link "New User Register Here":
                  - /url: Register.php
        - table:
          - rowgroup:
            - row "Important Note:":
              - cell "Important Note:"
            - 'row "Hotel Application has 2 builds: Build 1 Has been developed with known defects. Thus, functional test cases and automation scripts will fail on this build. Build 2 Known defects have been fixed. Thus, functional test cases and automation test scripts should pass when executed on this build. Go to Build 2"':
              - 'cell "Hotel Application has 2 builds: Build 1 Has been developed with known defects. Thus, functional test cases and automation scripts will fail on this build. Build 2 Known defects have been fixed. Thus, functional test cases and automation test scripts should pass when executed on this build. Go to Build 2"':
                - text: "Hotel Application has 2 builds:"
                - list:
                  - listitem:
                    - strong: Build 1
                    - text: Has been developed with known defects. Thus, functional test cases and automation scripts will fail on this build.
                  - listitem:
                    - strong: Build 2
                    - text: Known defects have been fixed. Thus, functional test cases and automation test scripts should pass when executed on this build.
                    - link "Go to Build 2":
                      - /url: ../HotelAppBuild2
                      - strong: Go to Build 2
            - 'row "For any queries/issues please email: info@adactin.com"':
              - 'cell "For any queries/issues please email: info@adactin.com"':
                - text: "For any queries/issues please email:"
                - link "info@adactin.com":
                  - /url: mailto:info@adactin.com
- table:
  - rowgroup:
    - row:
      - cell
    - row "© 2026 - Adactin.com. All Rights Reserved. Adactin Group Pty. Ltd.":
      - cell "© 2026 - Adactin.com. All Rights Reserved. Adactin Group Pty. Ltd.":
        - text: © 2026 -
        - link "Adactin.com":
          - /url: http://www.adactin.com
        - text: . All Rights Reserved. Adactin Group Pty. Ltd.
```

# Test source

```ts
  1  | ﻿const { test, expect } = require('@playwright/test');
  2  | const { LoginPage } = require('../pages/LoginPage.js');
  3  | 
  4  | test('Login Test', async ({ page }) => {
  5  |   const loginPage = new LoginPage(page);
  6  | 
  7  |   await loginPage.open();
  8  |   await loginPage.login('YOUR_USERNAME', 'YOUR_PASSWORD');
  9  | 
> 10 |   await expect(page).toHaveURL(/SearchHotel/i);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  11 | });
  12 | 
```