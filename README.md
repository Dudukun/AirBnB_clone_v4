<img src="https://github.com/jarehec/AirBnB_clone_v3/blob/master/dev/HBTN-hbnb-Final.png" width="160" height=auto />

# AirBnB Clone: Phase # 3

: API with Swagger

## Description

Project attempts to clone the the AirBnB application and website, including the
database, storage, RESTful API, Web Framework, and Front End.  Currently the
application is designed to run with 2 storage engine models:

* File Storage Engine:

  * `/models/engine/file_storage.py`

* Database Storage Engine:

  * `/models/engine/db_storage.py`

  * To Setup the DataBase for testing and development, there are 2 setup
  scripts that setup a database with certain privileges: `setup_mysql_test.sql`
  & `setup_mysql_test.sql` (for more on setup, see below).

  * The Database uses Environmental Variables for tests.  To execute tests with
  the environmental variables prepend these declarations to the execution
  command:

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
[COMMAND HERE]
```

## Environment

* __OS:__ Ubuntu 14.04 LTS
* __language:__ Python 3.4.3
* __web server:__ nginx/1.4.6
* __application server:__ Flask 0.12.2, Jinja2 2.9.6
* __web server gateway:__ gunicorn (version 19.7.1)
* __database:__ mysql Ver 14.14 Distrib 5.7.18
* __documentation:__ Swagger (flasgger==0.6.6)
* __style:__
  * __python:__ PEP 8 (v. 1.7.0)
  * __web static:__ [W3C Validator](https://validator.w3.org/)
  * __bash:__ ShellCheck 0.3.3

<img src="https://github.com/jarehec/AirBnB_clone_v3/blob/master/dev/hbnb_step5.png" />

## Configuration Files

The `/config/` directory contains configuration files for `nginx` and the
Upstart scripts.  The nginx configuration file is for the configuration file in
the path: `/etc/nginx/sites-available/default`.  The enabled site is a sym link
to that configuration file.  The upstart script should be saved in the path:
`/etc/init/[FILE_NAME.conf]`.  To begin this service, execute:

```
$ sudo start airbnb.conf
```
This script's main task is to execute the following `gunicorn` command:

```
$ gunicorn --bind 127.0.0.1:8001 wsgi.wsgi:web_flask.app
```

The `gunicorn` command starts an instance of a Flask Application.

---

### Web Server Gateway Interface (WSGI)

All integration with gunicorn occurs with `Upstart` `.conf` files.  The python
code for the WSGI is listed in the `/wsgi/` directory.  These python files run
the designated Flask Application.

## Setup

This project comes with various setup scripts to support automation, especially
during maintanence or to scale the entire project.  The following files are the
setupfiles along with a brief explanation:

* **`dev/setup.sql`:** Drops test and dev databases, and then reinitializes
the datbase.

  * Usage: `$ cat dev/setup.sql | mysql -uroot -p`

* **`setup_mysql_dev.sql`:** initialiezs dev database with mysql for testing

  * Usage: `$ cat setup_mysql_dev.sql | mysql -uroot -p`

* **`setup_mysql_test.sql`:** initializes test database with mysql for testing

  * Usage: `$ cat setup_mysql_test.sql | mysql -uroot -p`

* **`0-setup_web_static.sh`:** sets up nginx web server config file & the file
  structure.

  * Usage: `$ sudo ./0-setup_web_static.sh`

* **`3-deploy_web_static.py`:** uses 2 functions from (1-pack_web_static.py &
  2-do_deploy_web_static.py) that use the fabric3 python integration, to create
  a `.tgz` file on local host of all the local web static fils, and then calls
  the other function to deploy the compressed web static files.  Command must
  be executed from the `AirBnB_clone` root directory.

  * Usage: `$ fab -f 3-deploy_web_static.py deploy -i ~/.ssh/holberton -u ubuntu`

## Testing

### `unittest`

This project uses python library, `unittest` to run tests on all python files.
All unittests are in the `./tests` directory with the command:

* File Storage Engine Model:

  * `$ python3 -m unittest discover -v ./tests/`

* DataBase Storage Engine Model

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
python3 -m unittest discover -v ./tests/
```

---

### All Tests

The bash script `init_test.sh` executes all these tests for both File Storage &
DataBase Engine Models:

  * checks `pep8` style

  * runs all unittests

  * runs all w3c_validator tests

  * cleans up all `__pycache__` directories and the storage file, `file.json`

  * **Usage `init_test.sh`:**

```
$ ./dev/init_test.sh
```

---

### CLI Interactive Tests

* This project uses python library, `cmd` to run tests in an interactive command
  line interface.  To begin tests with the CLI, run this script:

#### File Storage Engine Model

```
$ ./console.py
```

#### To execute the CLI using the Database Storage Engine Model:

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
./console.py
```

#### For a detailed description of all tests, run these commands in the CLI:

```
(hbnb) help help
List available commands with "help" or detailed help with "help cmd".
(hbnb) help

Documented commands (type help <topic>):
========================================
Amenity    City  Place   State  airbnb  create   help  show
BaseModel  EOF   Review  User   all     destroy  quit  update

(hbnb) help User
class method with .function() syntax
        Usage: User.<command>(<id>)
(hbnb) help create
create: create [ARG] [PARAM 1] [PARAM 2] ...
        ARG = Class Name
        PARAM = <key name>=<value>
                value syntax: "<value>"
        SYNOPSIS: Creates a new instance of the Class from given input ARG
                  and PARAMS. Key in PARAM = an instance attribute.
        EXAMPLE: create City name="Chicago"
                 City.create(name="Chicago")
```

* Tests in the CLI may also be executed with this syntax:

  * **destroy:** `<class name>.destroy(<id>)`

  * **update:** `<class name>.update(<id>, <attribute name>, <attribute value>)`

  * **update with dictionary:** `<class name>.update(<id>,
    <dictionary representation>)`

---

### Continuous Integration Tests

Uses [Travis-CI](https://travis-ci.org/) to run all tests on all commits to the
github repo

# AirBnB Clone: Phase # 4

<img src="https://s3.amazonaws.com/intranet-projects-files/concepts/74/hbnb_step5.png" />

: Web dynamic

## Description of features added/updated and what we accomplished:
* make requests to our own API from the front using Ajax
* modify multiple HTML element styles with mix of Javascript and Jquery
* get and update multiple HTML element contents from our database
* manipulate the DOM for better dynamic experience
* use Jquery Ajax to make GET and POST requests to our backend
* listen/bind to DOM events
* listen/bind to user events
* make sure that HTML will not reload for each action: DOM manipulation, update values, fetch d\
ata from the front

## Environment
* All Javascript/Jquery scripts is fully compliant to `semistandard` with the flag `--global $`:
  `semistandard *.js --global $`
* Jquery is version 3.x
* Interpreted and debugged on Chrome(version 57.0)

## Primary Folder
* Added `web_dynamic` directory which includes all Javascript files under `scripts` directory and Jinja HTML templates under `templates` directory

## Files
---
File|Task
---|---
0-hbnb.py, templates/0-hbnb.html | Script that starts our Flask web application
1-hbnb.py, templates/1-hbnb.html, static/scripts/1-hbnb.js | Update filters section with added checkbox to listen for input and convert static to dynamic contents when the DOM is loaded
api/v1/app.py, web_dynamic/2-hbnb.py, web_dynamic/templates/2-hbnb.html, web_dynamic/static/styles/3-header.css, web_dynamic/static/scripts/2-hbnb.js | Make requests to HBNB API to get status, update API entry point by changing routes with our app.py, create new HTML template with dynamic contents, CSS elements with Jquery 
web_dynamic/3-hbnb.py, web_dynamic/templates/3-hbnb.html, web_dynamic/static/scripts/3-hbnb.js | Created new template based on previous one and updated for new features to fetch all places through Ajax requests to our backend, styled with Jquery Javascript script   
web_dynamic/4-hbnb.py, web_dynamic/templates/4-hbnb.html, web_dynamic/static/scripts/4-hbnb.js | Updated route to new Jinja template and added new `BUTTON` tag for when click, send a `POST` requests to places_search related to lists of Amenities checked
web_dynamic/100-hbnb.py, web_dynamic/templates/100-hbnb.html, web_dynamic/static/scripts/100-hbnb.js | updated template with checkbox next to each state and city so that when checked, Ajax will send `POST` request to display all places related to checked items

## To test please:
```
# expose port 5000 to port 5001 in your vm's config file: forward_port, guest: 5000, host: 5001
```
It’s important to test our AirBnB API with the port 5001 and have the latest browser version
* `Follow instructions above to load data into MySQL databasesd
* Run this command to start front side Flask web application
```
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db python3 -m web_dynamic.0-hbnb
```
* Run this command to start back end engine
```
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db HBNB_API_PORT=5001 python3 -m api.v1.app
```
* Start your `Chrome` browser and input url below and press enter:
```
http://0.0.0.0:5001/api/v1/status/
```
* Hover mouse over `States` or `Amenities`, check any checkbox and press `Search`

## Authors

* MJ Johnson, [@mj31508](https://github.com/mj31508)
* David John Coleman II, [davidjohncoleman.com](http://www.davidjohncoleman.com/) | [@djohncoleman](https://twitter.com/djohncoleman)
* Kimberly Wong, [kjowong](https://github.com/kjowong) | [@kjowong](https://twitter.com/kjowong) | [kjowong@gmail.com](kjowong@gmail.com)
* Carrie Ybay, [hicarrie](https://github.com/hicarrie) | [@hicarrie_](https://twitter.com/hicarrie_)
* Jared Heck, [jarehec](https://github.com/jarehec) | [@jarehec](https://twitter.com/jarehec)
* Heindrick Cheung, [hcheung01](https://github.com/hcheung01) | [@HeindrickCheung](https://twitter.com/HeindrickCheung)
* Stephen Chu, [stephenchu530](https://github.com/stephenchu530) | [@StephenChu530](https://twitter.com/StephenChu530)

## License

MIT License
