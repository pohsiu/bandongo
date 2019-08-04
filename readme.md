# build virtualenv with python 2.7
```
virtualenv --python=/usr/bin/python2.7 env
```

# source with virtaulenv you just created (env)
```
source ./env/bin/activate
```

# install require package with pip
```
pip install -r requirement.txt
```

# migrate auth
``` 
python manage.py migrate
```

# run up django server
```
python manage.py runserver
```
