#mc-errors
This module formats errors received from a backend service call to be returned to the calling function

####Use
Require the module using the full path of the module. i.e. 
`var mcErrors = require('@memberclicks/mc-errors');`

The format of the errors should be:
```
{
  status : '',
  errors : [{ message : '' }]
} 
```