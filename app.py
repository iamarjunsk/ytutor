from flask import Flask, render_template, url_for, request, redirect, Response, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import requests
import datetime
from datetime import *
from io import BytesIO
from werkzeug.security import generate_password_hash, check_password_hash
import sys
import smtplib

app=Flask(__name__)

ENV='dev'
if ENV == 'dev':
    app.debug=True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:sk@localhost/yt'
else:
    app.debug=False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://nstwovisvqlohk:34c39c999856c07630b7b41b71f237dd4687f998ef1cc895992036f1febb36b5@ec2-18-213-176-229.compute-1.amazonaws.com:5432/dauhc9qantcm2m'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
app.secret_key = 'arjunsk'


db = SQLAlchemy(app)


senderEmail='ytutor.mgt@gmail.com'
emailPassword="ytutor@#yt"
server=smtplib.SMTP('smtp.gmail.com',587)
server.starttls()
server.login(senderEmail,emailPassword)
print("login success")
# server.sendmail(senderEmail,'skangadippuram@gmail.com', "hai")
# print("Email sended")

class Tutor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tutid = db.Column(db.Integer)
    email = db.Column(db.String(30), unique = True, nullable = False)
    fname  =  db.Column(db.String(30), nullable = False)
    username = db.Column(db.String(30), nullable = False)
    password = db.Column(db.String(300), nullable = False)
    dob = db.Column(db.DateTime, nullable = False)
    phone = db.Column(db.String(20), nullable = False)
    qualification = db.Column(db.String(50), nullable = False)
    district = db.Column(db.String(30), nullable = False)
    taluk = db.Column(db.String(30), nullable = True)
    village = db.Column(db.String(30), nullable = True)
    tuition = db.Column(db.String(30), nullable = True)
    maths = db.Column(db.Boolean, nullable = True, default = False)
    science = db.Column(db.Boolean, nullable = True, default = False)
    social = db.Column(db.Boolean, nullable = True, default = False)
    computer = db.Column(db.Boolean, nullable = True, default = False)
    physics = db.Column(db.Boolean, nullable = True, default = False)
    chemistry = db.Column(db.Boolean, nullable = True, default = False)
    biology = db.Column(db.Boolean, nullable = True, default = False)
    scmaths = db.Column(db.Boolean, nullable = True, default = False)
    extra = db.Column(db.String(100), nullable = True, default = 'False')
    image = db.Column(db.String(800000), nullable = False, default = 'False')
    student = db.Column(db.String(30),  default = 'False')
    earn = db.Column(db.Float,default = 0)
    totalearn = db.Column(db.Float,default = 0)
    date = db.Column(db.DateTime,nullable = False,default = datetime.utcnow)
    isvarify = db.Column(db.Boolean, nullable = True, default = False)
    ismale = db.Column(db.Boolean, nullable = False)
    isindian = db.Column(db.Boolean, nullable = True, default = True)
    nonindplace = db.Column(db.String(20),  default = 'False') 
    isactive = db.Column(db.Boolean, default = True)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studid = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(30), unique=True, nullable=False)
    fname = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(300), nullable=False)
    dob = db.Column(db.DateTime, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    district = db.Column(db.String(30), nullable=False)
    taluk = db.Column(db.String(30), nullable=False)
    village = db.Column(db.String(30), nullable=False)
    tuition = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(800000), nullable=False, default='False')
    tutor = db.Column(db.String(30),  default='False')
    attend = db.Column(db.Integer,nullable=True)
    tudattend = db.Column(db.Integer,nullable=True)
    parent = db.Column(db.String(30), nullable=False)
    date = db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    ismale = db.Column(db.Boolean, nullable=False)
    isactive = db.Column(db.Boolean, default = True)

@app.route('/tutor/verify',methods=['GET','POST'])
def tutvarify():
    if request.method == "POST" :
        user=request.form.get("username")
        tutid=request.form.get("tutid")
        admin = Tutor.query.filter_by(username=user).first()
        admin.isvarify=True
        admin.tutid=tutid
        db.session.commit()
        messegeEmail="Welcome to YoursTutor \n Helo " + admin.faname + " your ID and password is \n " + admin.tutid + " and \n" + admin.username + " . \n Thankyou :)"
        server.sendmail(senderEmail,admin.email, messegeEmail )
        print("Email sended")
        return redirect('/admin/tutor/'+user)

@app.route('/tutor/delete',methods=['GET','POST'])
def tutdelete():
    if request.method == "POST" :
        user=request.form.get("username")
        admin = Tutor.query.filter_by(username=user).update(dict(isactive=False))
        db.session.commit()
        return redirect('/admin/tutor/'+user)

@app.route('/student/delete',methods=['GET','POST'])
def studdelete():
    if request.method == "POST" :
        user=request.form.get("username")
        admin = Customer.query.filter_by(username=user).update(dict(isactive=False))
        db.session.commit()
        return redirect('/admin/student/'+user)

@app.route('/student/register',methods=['GET','POST'])
def studreg():
    if request.method == "POST" :
        email = request.form.get("email")
        checkEm = Customer.query.filter_by(email=email).first()
        if(checkEm):
            return render_template('studReg.html',student='active', messege="Email already registered")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        do =request.form.get("dob")
        do = do.split('-')
        dob = date(int(do[0]),int(do[1]),int(do[2]))
        phone = str(request.form.get("phone"))
        tuition = request.form.get("tuition")
        parent = request.form.get("parent")
        username = request.form.get("username")
        checkusr = Customer.query.filter_by(username=username).first()
        if(checkusr):
            return render_template('studReg.html',student='active', messege="Username already taken")
        name = request.form.get("name")
        ismale=bool(request.form.get("male"))
        image = request.form.get('output3')
        pin=request.form.get('pin')
        loc=requests.get('https://api.postalpincode.in/pincode/'+pin)
        locn=loc.json()
        location=locn[0]["PostOffice"][0]["Name"]
        block=locn[0]["PostOffice"][0]["Block"]
        district=locn[0]["PostOffice"][0]["District"]

        if(password1 == password2):
            password = generate_password_hash(password1, "sha256")
            user=Customer(fname=name, username=username, email=email, password=password, dob=dob, phone=phone, district=district, taluk=block, village=location, tuition=tuition, image=image, ismale=ismale, parent=parent )            
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/student/login')
        else:
            print("password Miss match")

    return render_template('studReg.html',student='active')

@app.route('/tutor/',methods=['GET','POST'])
def tutor():
    try:
        user = session['tutor']
        tut = Tutor.query.filter_by(username=user).first()
        return render_template('tutprofile.html',user=tut)
    except:
        return redirect('/tutor/login')

@app.route('/student/',methods=['GET','POST'])
def student():
    try:
        user = session['student']
        stud = Customer.query.filter_by(username=user).first()
        return render_template('studprofile.html',user=stud)
    except:
        return redirect('/student/login')

@app.route('/tutor/register',methods=['GET','POST'])
def tutreg():
    if request.method == "POST" :
        email = request.form.get("email")
        checkEm = Tutor.query.filter_by(email=email).first()
        if(checkEm):
            return render_template('tutReg.html',student='active', messege="Email already registered")
        username = request.form.get("username")
        checkusr = Tutor.query.filter_by(username=username).first()
        if(checkusr):
            return render_template('tutReg.html',student='active', messege="Username already taken")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        do =request.form.get("dob")
        do = do.split('-')
        dob = date(int(do[0]),int(do[1]),int(do[2]))
        phone = str(request.form.get("phone"))
        qualification = request.form.get("qualification")
        tuition = request.form.get("tuition")
        maths = bool(request.form.get("maths"))
        science = bool(request.form.get("science"))
        social = bool(request.form.get("social"))
        computer = bool(request.form.get("computer"))
        physics = bool(request.form.get("physics"))
        chemistry = bool(request.form.get("chemistry"))
        biology = bool(request.form.get("biology"))
        scmaths = bool(request.form.get("ScMaths"))
        extra = request.form.get("extra")
        name = request.form.get("name")
        ismale=bool(request.form.get("male"))
        image = request.form.get('output3')
        pin=request.form.get('pin')
        loc=requests.get('https://api.postalpincode.in/pincode/'+pin)
        try:
            locn=loc.json()
            location=locn[0]["PostOffice"][0]["Name"]
            block=locn[0]["PostOffice"][0]["Block"]
            district=locn[0]["PostOffice"][0]["District"]
        except:
            return render_template('tutReg.html', messege="PIN Code Invalid", tutor='active')
        if(password1 == password2):
            password = generate_password_hash(password1, "sha256")
            user=Tutor(fname=name, username=username, email=email, password=password, dob=dob, phone=phone, qualification=qualification, district=district, taluk=block, village=location, tuition=tuition, maths=maths, science=science, social=social, computer=computer, physics=physics, chemistry=chemistry, biology=biology, scmaths=scmaths, extra=extra, image=image, ismale=ismale )            
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/tutor')
        else:
            print("password Miss match")

    return render_template('tutReg.html',tutor='active')

@app.route('/tutor/login' ,methods=['GET','POST'])
def tutlog():
    session.pop('tutor',None)
    if request.method == "POST" :
        username = request.form.get('username')
        password = request.form.get('password')
        user = Tutor.query.filter_by(username=username).first()
        if(user):
            if (check_password_hash(user.password,password)):
                session['tutor']=username
                return redirect('/tutor')
            else:
                user = "Tutor"
                path="/tutor/login"
                message="Username or password missmatch"
                return render_template('log.html', user=user, path=path, tutor='active', error=message, newuser='/tutor/register')
        else:
            user = "Tutor"
            path="/tutor/login"
            message="Username not found"
            return render_template('log.html', user=user, path=path, tutor='active', error=message, newuser='/tutor/register')
            
    user = "Tutor"
    path="/tutor/login"
    return render_template('log.html', user=user, path=path, tutor='active', newuser='/tutor/register')

@app.route('/student/login' ,methods=['GET','POST'])
def studtlog():
    session.pop('student',None)
    if request.method == "POST" :
        username = request.form.get('username')
        password = request.form.get('password')
        user = Customer.query.filter_by(username=username).first()
        if(user):
            if (check_password_hash(user.password,password)):
                session['student']=username
                return redirect('/student')
            else:
                user = "Student"
                path="/student/login"
                message="Username or password missmatch"
                return render_template('log.html', user=user, path=path, student='active', error=message, newuser='/student/register')
        else:
            user = "Student"
            path="/student/login"
            message="Username not found"
            return render_template('log.html', user=user, path=path, student='active', error=message, newuser='/student/register')
            
    user = "Student"
    path="/student/login"
    return render_template('log.html', user=user, path=path, student='active',newuser='/student/register')

@app.route('/admin/',methods=['GET','POST'])
def admin():
    tutor=Tutor.query.filter_by(isvarify=False, isactive=True).all()
    return render_template('admnon.html',tutors=tutor)

@app.errorhandler(401)
def page_not_found(e):
    return (e)
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html')

@app.route("/admin/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")        
        print(username,password)
        return redirect('/')
    else:
        path="/admin/login"
        heading="Admin Login"
        return render_template('login.html', path=path, heading= heading)
        
@app.route("/admin/search", methods=["GET","POST"])
def tutsh():
    if request.method == "POST":
        sh=request.form.get("search")
        
        names=Tutor.query.filter(Tutor.fname.contains(sh)).all()
        village=Tutor.query.filter(Tutor.village.contains(sh)).all()  
        taluk=Tutor.query.filter(Tutor.taluk.contains(sh)).all()  
        district=Tutor.query.filter(Tutor.district.contains(sh)).all()  
        username=Tutor.query.filter(Tutor.username.contains(sh)).all()
        qualific=Tutor.query.filter(Tutor.qualification.contains(sh)).all()
        return render_template("admnon.html", display="none", names=names,village=village,taluk=taluk,district=district,username=username,qualific=qualific)

@app.route('/admin/tutor/<int:tutid>/',methods=['GET','POST'])
def tutadid(tutid):
    # return(str(tutid))
    tutor=Tutor.query.filter_by(tutid=tutid).first()
    if(tutor):
        return render_template('tutadminprof.html',tutor=tutor)
    else:
        return render_template('404.html')
@app.route('/admin/tutor/<username>',methods=['GET','POST'])
def adtut(username):
    tutor=Tutor.query.filter_by(username=username).first()
    if(tutor.ismale==True):
        count=Tutor.query.filter_by(ismale=True, isvarify=True).count()
        tutid=20001+count
    else:
        count=Tutor.query.filter_by(ismale=False, isvarify=True).count()
        tutid=40001+count
    return render_template('tutadminprof.html',tutor=tutor,tutid=tutid)

@app.route('/')
def home():
    return render_template('home.html')


if __name__ == '__main__':
    app.run()