from flask import Flask, render_template, url_for, request, redirect, Response, session, flash, make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import requests
import datetime
from datetime import *
from io import BytesIO
from werkzeug.security import generate_password_hash, check_password_hash
import sys
import smtplib

import pdfkit
import random
from secrets import secretkey,email,emailpassword,db

app=Flask(__name__)

ENV='dev'
if ENV == 'dev':
    app.debug=True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/yt'
else:
    app.debug=False
    app.config['SQLALCHEMY_DATABASE_URI'] = db


app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
app.secret_key = secretkey


db = SQLAlchemy(app)


senderEmail=email
emailPassword=emailpassword
server=smtplib.SMTP('smtp.gmail.com',587)
server.starttls()
server.login(senderEmail,emailPassword)
print("login success")

class Tutor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tutid = db.Column(db.Integer)
    email = db.Column(db.String(30), unique = True, nullable = False)
    fname  =  db.Column(db.String(30), nullable = False)
    username = db.Column(db.String(30), nullable = False)
    password = db.Column(db.String(300), nullable = False)
    dob = db.Column(db.DateTime, nullable = False)
    phone = db.Column(db.String(10), nullable = False)
    pin = db.Column(db.String(10), nullable = False)
    state = db.Column(db.String(30), nullable = False)
    district = db.Column(db.String(30), nullable = False)
    block = db.Column(db.String(30), nullable = True)
    location = db.Column(db.String(30), nullable = True)
    image = db.Column(db.String(800000), nullable = False, default = 'False')
    isactive = db.Column(db.Boolean, default = True)
    date = db.Column(db.DateTime,nullable = False,default = datetime.utcnow)
    isvarify = db.Column(db.Boolean, nullable = True, default = False)
    ismale = db.Column(db.Boolean, nullable = False)
    
    qualification = db.Column(db.String(50), nullable = False)
    Bed = db.Column(db.Boolean, nullable = True, default = False)
    SET = db.Column(db.Boolean, nullable = True, default = False)
    NET = db.Column(db.Boolean, nullable = True, default = False)
    pursuing = db.Column(db.String(50), nullable = True)

    exInstitute = db.Column(db.String(30), nullable = True)
    exTime = db.Column(db.String(30), nullable = True)

    is1to5 = db.Column(db.Boolean,default = False)
    is6to12 = db.Column(db.Boolean,default = False)
    isUG = db.Column(db.Boolean,default = False)
    isPG = db.Column(db.Boolean,default = False)
    isCoaching = db.Column(db.Boolean,default = False)
    ugBrach = db.Column(db.String(30), nullable = True)
    pgBrach =   db.Column(db.String(30), nullable = True)
    coachBrach = db.Column(db.String(30), nullable = True)
    tutionopt =  db.Column(db.String(30), nullable = True)
    syllabus = db.Column(db.String(30), nullable = True)
    isOnline = db.Column(db.Boolean, nullable = True, default = False)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studid = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(30), unique=True, nullable=False)
    fname = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(300), nullable=False)
    dob = db.Column(db.DateTime, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(30), nullable = False)
    district = db.Column(db.String(30), nullable=False)
    block = db.Column(db.String(30), nullable=False)
    location = db.Column(db.String(30), nullable=False)
    tuition = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(800000), nullable=False, default='False')
    tutor = db.Column(db.String(30),nullable=True)
    attend = db.relationship('Attendence', backref='todayatt')
    tudattend = db.Column(db.Integer,nullable=True)
    parent = db.Column(db.String(30), nullable=False)
    date = db.Column(db.DateTime,nullable=False, default = datetime.utcnow)
    ismale = db.Column(db.Boolean, nullable=False)
    isactive = db.Column(db.Boolean, default = True)

class Marketer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    markid = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(30), unique=True, nullable=False)
    fname = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(300), nullable=False)
    dob = db.Column(db.DateTime, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(30), nullable = False)
    district = db.Column(db.String(30), nullable=False)
    block = db.Column(db.String(30), nullable=False)
    location = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(800000), nullable=False, default='False')
    qualification = db.Column(db.String(50), nullable = False)
    isvarify = db.Column(db.Boolean, nullable = True, default = False)
    isactive = db.Column(db.Boolean, default = True)
    ismale = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.DateTime,nullable=False, default = datetime.utcnow)

class Attendence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime,nullable=False, default = datetime.utcnow)
    minute=db.Column(db.Integer)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
 
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(300), nullable=False)
    issuperadmin = db.Column(db.Boolean, nullable = True, default = False)   


# @app.route('/pdf')
# def method_name():
#     redered="hai"
#     pdf=pdfkit.from_string(redered,False)

#     response=make_response(pdf)
#     response.headers['Content-Type']='application/pdf'
#     response.headers['Content-Disposition']='inline; filename=test.pdf'
#     return 

@app.route('/tutor/verify',methods=['GET','POST'])
def tutvarify():
    if request.method == "POST" :
        user=request.form.get("username")
        tutid=request.form.get("tutid")
        admin = Tutor.query.filter_by(username=user).first()
        admin.isvarify=True
        admin.tutid=tutid
        db.session.commit()
        messegeEmail="Welcome to YoursTutor \nHelo " + admin.fname + " your ID and Username is \n " + str(admin.tutid) + " and " + admin.username + " . \nThankyou :)"
        server.sendmail(senderEmail,admin.email, messegeEmail )
        print("Email sended")
        flash("Verified")
        return redirect('/admin/tutor/'+user)

@app.route('/marketer/verify',methods=['GET','POST'])
def markvarify():
    if request.method == "POST" :
        user=request.form.get("username")
        markid=request.form.get("markid")
        admin = Marketer.query.filter_by(username=user).first()
        admin.isvarify=True
        admin.markid=markid
        db.session.commit()
        messegeEmail="Welcome to YoursTutor \nHelo " + admin.fname + " your ID and Username is \n " + str(admin.markid) + " and " + admin.username + " . \nThankyou :)"
        try:
            server.sendmail(senderEmail,admin.email, messegeEmail )
        except:
            flash("Issue found in Sending Email")
        print("Email sended")
        flash("Verified")
        return redirect('/admin/marketer/'+user)

@app.route('/student/assign',methods=['POST'])
def tutassign():
    if request.method == "POST" :
        user=request.form.get("username")
        tutname=request.form.get("tutname")
        tut=Tutor.query.filter_by(username=tutname).first()
        if(not tut):
            flash("Tutor not found!")
            return redirect('/admin/student/'+user)
        admin = Customer.query.filter_by(username=user).first()
        admin.tutor = tutname
        db.session.commit()
        messegeEmail="Helo " + admin.fname + " your ID and Username is \n " + str(admin.studid) + " and " + admin.username + "\nWe assigned a tutor for you named "+ tut.fname +" . \nThankyou :)"
        server.sendmail(senderEmail,admin.email, messegeEmail )
        print("Email sended")
        flash("Tutor updated")
        return redirect('/admin/student/'+user)

@app.route('/tutor/delete',methods=['GET','POST'])
def tutdelete():
    if request.method == "POST" :
        user=request.form.get("username")
        admin = Tutor.query.filter_by(username=user).update(dict(isactive=False))
        db.session.commit()
        return redirect('/admin/tutor/'+user)

@app.route('/marketer/delete',methods=['GET','POST'])
def markdelete():
    if request.method == "POST" :
        user=request.form.get("username")
        admin = Marketer.query.filter_by(username=user).update(dict(isactive=False))
        db.session.commit()
        return redirect('/admin/tutor/'+user)

@app.route('/student/delete',methods=['GET','POST'])
def studdelete():
    if request.method == "POST" :
        user=request.form.get("username")
        admin = Customer.query.filter_by(username=user).update(dict(isactive=False))
        db.session.commit()
        return redirect('/admin/student/'+user)
@app.route('/student/attentence', methods=['POST'])
def att():
    tut = request.form.get("tutor")
    stud = request.form.get("stud")
    minute = request.form.get("minute")
    t = Tutor.query.filter_by(username=tut).first()
    s = Customer.query.filter_by(username=stud).first()
    if(t):
        todaydate = datetime.utcnow().date()
        at= Attendence(date = todaydate, minute=minute, todayatt=s)
        db.session.add(at)
        db.session.commit()
        try:
            messege = "Hello "+ t.fname +", Your Attendance is Updated"
            server.sendmail(senderEmail,t.email, messege )
        except:
            pass
        flash("attendance updated")
    else:
        flash("Tutor not found")
    return redirect('/student')

@app.route('/tutor/',methods=['GET','POST'])
def tutor():
    try:
        user = session['tutor']
        tut = Tutor.query.filter_by(username=user).first()
        studs=Customer.query.filter_by(tutor=tut.username).all()
        return render_template('tutprofile.html',user=tut,studs=studs)
    except:
        return redirect('/tutor/login')

@app.route('/student/',methods=['GET','POST'])
def student():
    try:
        user = session['student']
        stud = Customer.query.filter_by(username=user).first()
        tut = Tutor.query.filter_by(username=stud.tutor).first()
        return render_template('studprofile.html',user=stud,tutor=tut)
    except:
        return redirect('/student/login')

@app.route('/marketer/',methods=['GET','POST'])
def marketer():
    try:
        user = session['marketer']
        mark = Marketer.query.filter_by(username=user).first()
        return render_template('markprof.html',user=mark)
        # return redirect('/')
    except:
        return redirect('/marketer/register')

@app.route('/tutor/register',methods=['GET','POST'])
def tutreg():
    if request.method == "POST" :
        email = request.form.get("email")
        checkEm = Tutor.query.filter_by(email=email).first()
        if(checkEm):
            flash("Email already registered")
            return redirect('tutor/register')
        username = request.form.get("username")
        checkusr = Tutor.query.filter_by(username=username).first()
        if(checkusr):
            flash("Username already taken")
            return redirect('tutor/register')
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        do =request.form.get("dob")
        do = do.split('-')
        dob = date(int(do[0]),int(do[1]),int(do[2]))
        phone = str(request.form.get("phone"))
        if(len(phone)!=10):
            print(len(phone))
            flash("Phone number invalid!")
            return redirect('/tutor/register')
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
        todaydate = datetime.utcnow().date()
        pin=request.form.get('pin')
        loc=requests.get('https://api.postalpincode.in/pincode/'+pin)
        try:
            locn=loc.json()
            location=locn[0]["PostOffice"][0]["Name"]
            block=locn[0]["PostOffice"][0]["Block"]
            district=locn[0]["PostOffice"][0]["District"]
            state=locn[0]["PostOffice"][0]["State"]
        except:
            flash("PIN Code Invalid")
            return redirect('/tutor/register')
        if(password1 == password2):
            password = generate_password_hash(password1, "sha256")
            user=Tutor(fname=name, username=username, email=email, password=password, dob=dob, date=todaydate, phone=phone, qualification=qualification, state=state, district=district, block=block, location=location, tuition=tuition, maths=maths, science=science, social=social, computer=computer, physics=physics, chemistry=chemistry, biology=biology, scmaths=scmaths, extra=extra, image=image, ismale=ismale )            
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/tutor')
        else:
            flash("Password miss match")
            return redirect('/tutor/register')

    return render_template('tutReg.html',tutor='active')

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
        todaydate = datetime.utcnow().date()
        pin=request.form.get('pin')
        loc=requests.get('https://api.postalpincode.in/pincode/'+pin)
        try:
            locn=loc.json()
            location=locn[0]["PostOffice"][0]["Name"]
            block=locn[0]["PostOffice"][0]["Block"]
            district=locn[0]["PostOffice"][0]["District"]
            state=locn[0]["PostOffice"][0]["State"]
        except:
            return render_template('studReg.html', messege="PIN Code Invalid", student='active')
        count=Customer.query.count()
        studid=600001+count
        if(password1 == password2):
            password = generate_password_hash(password1, "sha256")
            user=Customer(fname=name, username=username, studid=studid, email=email, password=password, dob=dob, date=todaydate, phone=phone,state=state, district=district, block=block, location=location, tuition=tuition, image=image, ismale=ismale, parent=parent )            
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/student/login')
        else:
            return render_template('studReg.html',student='active', messege="Password missmatch")

    return render_template('studReg.html',student='active')

@app.route('/marketer/register',methods=['GET','POST'])
def markreg():
    if request.method == "POST" :
        email = request.form.get("email")
        checkEm = Marketer.query.filter_by(email=email).first()
        if(checkEm):
            flash('Email already Registered')
            return redirect('/marketer/register')
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        do =request.form.get("dob")
        do = do.split('-')
        dob = date(int(do[0]),int(do[1]),int(do[2]))
        phone = str(request.form.get("phone"))
        qualification = request.form.get("qualification")
        username = request.form.get("username")
        checkusr = Marketer.query.filter_by(username=username).first()
        if(checkusr):
            flash('Username already taken')
            return redirect('/marketer/register')
        name = request.form.get("name")
        ismale=bool(request.form.get("male"))
        image = request.form.get('output3')
        todaydate = datetime.utcnow().date()
        pin=request.form.get('pin')
        loc=requests.get('https://api.postalpincode.in/pincode/'+pin)
        try:
            locn=loc.json()
            location=locn[0]["PostOffice"][0]["Name"]
            block=locn[0]["PostOffice"][0]["Block"]
            district=locn[0]["PostOffice"][0]["District"]
            state=locn[0]["PostOffice"][0]["State"]
        except:
            flash('Pincode invalid')
            return redirect('/marketer/register')
        if(password1 == password2):
            password = generate_password_hash(password1, "sha256")
            user=Marketer(fname=name, username=username, email=email, password=password, dob=dob, date=todaydate, phone=phone, state=state, district=district, block=block, location=location, image=image, ismale=ismale, qualification=qualification)            
            db.session.add(user)
            db.session.commit()
            print('commited')
            flash("Registration Successfull")
            return redirect('/marketer/register')
        else:
            flash("password Miss match")
            return redirect('/marketer/register')

    return render_template('markreg.html',marketer='active')

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
                flash("Username or password missmatch")
                return redirect('/tutor/login')
        else:
            flash("Username not found")
            return redirect('/tutor/login')
            
    user = "Tutor"
    path="/tutor/login"
    reset="/tutor/forgot"
    newuser='/tutor/register'
    usr = { 
        "user":user,
        "path":path,
        "reset":reset,
        "newuser":newuser
    }
    return render_template('log.html', tutor='active', usr=usr)

@app.route('/tutor/forgot', methods=['GET', 'POST'])
def tutreset():
    if request.method=="GET":
        session.pop('pin',None)
        return render_template("password.html",vem="block",vpin="none")
    else:
        try:
            pin = session["pin"]
            session.pop('pin',None)
            pin_c = request.form.get('pin')
            if(pin == int(pin_c)):
                loc='/tutor/pass'
                return render_template('pass.html',loc=loc)
            else:
                flash("Pin Incorrect")
                return redirect('/tutor/forgot')
        except:
            email = request.form.get('email')
            session['passem']=email
            isact = Tutor.query.filter_by(email=email).first()
            if(isact):
                n = random.randint(100000,999999)
                session["pin"]=n
                messegeEmail="\nHai "+ isact.fname + " username: "+ isact.username +", Your password reset code is "+ str(n)
                server.sendmail(senderEmail,isact.email, messegeEmail )
                return render_template("password.html",vem="none",vpin="block")
            else:
                flash("Email not registered")
                return redirect('/tutor/forgot')

@app.route('/tutor/pass', methods=['POST'])
def tutpass():
    pass1 = request.form.get('password1')
    pass2 = request.form.get('password2')
    if(pass1==pass2):
        email=session['passem']
        session.pop('passem',None)
        user = Tutor.query.filter_by(email=email).first()
        if(user):
            password = generate_password_hash(pass1, "sha256")
            user.password=password
            db.session.commit()
            flash("Password changed successfully.")
            return redirect('/tutor/login')
        else:
            flash("No user found!")
            return redirect('/student/login')
    else:
        flash('Password missmatch')
        return redirect('/student/login')



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
                flash("Username or password missmatch")
                return redirect('/student/login')
        else:
            flash("Username not found")
            return redirect('/student/login')            
    user = "Student"
    path="/student/login"
    reset="/student/forgot"
    newuser='/student/register'
    usr = { 
        "user":user,
        "path":path,
        "reset":reset,
        "newuser":newuser
        }
    return render_template('log.html', student='active', usr=usr)

@app.route('/student/forgot', methods=['GET', 'POST'])
def studreset():
    if request.method=="GET":
        session.pop('pin',None)
        return render_template("password.html",vem="block",vpin="none")
    else:
        try:
            pin = session["pin"]
            session.pop('pin',None)
            pin_c = request.form.get('pin')
            if(pin == int(pin_c)):
                loc='/student/pass'
                return render_template('pass.html',loc=loc)
            else:
                flash("Pin Incorrect")
                return redirect('/student/forgot')
        except:
            email = request.form.get('email')
            session['passem']=email
            isact = Customer.query.filter_by(email=email).first()
            if(isact):
                n = random.randint(100000,999999)
                session["pin"]=n
                messegeEmail="\nHai "+ isact.fname + " username: "+ isact.username +", Your password reset code is "+ str(n)
                server.sendmail(senderEmail,isact.email, messegeEmail )
                return render_template("password.html",vem="none",vpin="block")
            else:
                flash("Email not registered")
                return redirect('/student/forgot')

@app.route('/student/pass', methods=['POST'])
def studpass():
    pass1 = request.form.get('password1')
    pass2 = request.form.get('password2')
    if(pass1==pass2):
        email=session['passem']
        session.pop('passem',None)
        user = Customer.query.filter_by(email=email).first()
        if(user):
            password = generate_password_hash(pass1, "sha256")
            user.password=password
            db.session.commit()
            flash("Password changed successfully.")
            return redirect('/student/login')
        else:
            flash("No user found!")
            return redirect('/student/login')
    else:
        flash('Password missmatch')
        return redirect('/student/login')

@app.route('/marketer/login' ,methods=['GET','POST'])
def marketertlog():
    session.pop('marketer',None)
    if request.method == "POST" :
        username = request.form.get('username')
        password = request.form.get('password')
        user = Marketer.query.filter_by(username=username).first()
        if(user):
            if (check_password_hash(user.password,password)):
                session['marketer']=username
                return redirect('/marketer')
            else:
                user = "Marketer"
                path="/marketer/login"
                message="Username or password missmatch"
                return render_template('log.html', user=user, path=path, marketer='active', error=message, newuser='/marketer/register')
        else:
            user = "Marketer"
            path="/marketer/login"
            message="Username not found"
            return render_template('log.html', user=user, path=path, marketer='active', error=message, newuser='/marketer/register')
            
    user = "Marketer"
    path="/marketer/login"
    return render_template('log.html', user=user, path=path, marketer='active',newuser='/marketer/register')





#admin section  

@app.route('/admin/',methods=['GET','POST'])
def admin():
    try:
        user=session['admin']
        tut=Admin.query.filter_by(username=user).first()
        kl1_t = Tutor.query.filter_by(district="Thiruvananthapuram").count()
        kl2_t = Tutor.query.filter_by(district="Kollam").count()
        kl3_t = Tutor.query.filter_by(district="Pathanamthitta").count()
        kl4_t = Tutor.query.filter_by(district="Alappuzha").count()
        kl5_t = Tutor.query.filter_by(district="Kottayam").count()
        kl6_t = Tutor.query.filter_by(district="Idukki").count()
        kl7_t = Tutor.query.filter_by(district="Ernakulam").count()
        kl8_t = Tutor.query.filter_by(district="Thrissur").count()
        kl9_t = Tutor.query.filter_by(district="Palakkad").count()
        kl10_t = Tutor.query.filter_by(district="Malappuram").count()
        kl11_t = Tutor.query.filter_by(district="Kozhikode").count()
        kl12_t = Tutor.query.filter_by(district="Wayanad").count()
        kl13_t = Tutor.query.filter_by(district="Kannur").count()
        kl14_t = Tutor.query.filter_by(district="Kasargod").count()
        kl1_s = Customer.query.filter_by(district="Thiruvananthapuram").count()
        kl2_s = Customer.query.filter_by(district="Kollam").count()
        kl3_s = Customer.query.filter_by(district="Pathanamthitta").count()
        kl4_s = Customer.query.filter_by(district="Alappuzha").count()
        kl5_s = Customer.query.filter_by(district="Kottayam").count()
        kl6_s = Customer.query.filter_by(district="Idukki").count()
        kl7_s = Customer.query.filter_by(district="Ernakulam").count()
        kl8_s = Customer.query.filter_by(district="Thrissur").count()
        kl9_s = Customer.query.filter_by(district="Palakkad").count()
        kl10_s = Customer.query.filter_by(district="Malappuram").count()
        kl11_s = Customer.query.filter_by(district="Kozhikode").count()
        kl12_s = Customer.query.filter_by(district="Wayanad").count()
        kl13_s = Customer.query.filter_by(district="Kannur").count()
        kl14_s = Customer.query.filter_by(district="Kasargod").count()
        kl1_m = Marketer.query.filter_by(district="Thiruvananthapuram").count()
        kl2_m = Marketer.query.filter_by(district="Kollam").count()
        kl3_m = Marketer.query.filter_by(district="Pathanamthitta").count()
        kl4_m = Marketer.query.filter_by(district="Alappuzha").count()
        kl5_m = Marketer.query.filter_by(district="Kottayam").count()
        kl6_m = Marketer.query.filter_by(district="Idukki").count()
        kl7_m = Marketer.query.filter_by(district="Ernakulam").count()
        kl8_m = Marketer.query.filter_by(district="Thrissur").count()
        kl9_m = Marketer.query.filter_by(district="Palakkad").count()
        kl10_m = Marketer.query.filter_by(district="Malappuram").count()
        kl11_m = Marketer.query.filter_by(district="Kozhikode").count()
        kl12_m = Marketer.query.filter_by(district="Wayanad").count()
        kl13_m = Marketer.query.filter_by(district="Kannur").count()
        kl14_m = Marketer.query.filter_by(district="Kasargod").count()
        district={
            "kl1_t":kl1_t,
            "kl2_t":kl2_t,
            "kl3_t":kl3_t,
            "kl4_t":kl4_t,
            "kl5_t":kl5_t,
            "kl6_t":kl6_t,
            "kl7_t":kl7_t,
            "kl8_t":kl8_t,
            "kl9_t":kl9_t,
            "kl10_t":kl10_t,
            "kl11_t":kl11_t,
            "kl12_t":kl12_t,
            "kl13_t":kl13_t,
            "kl14_t":kl14_t,
            "kl1_s":kl1_s,
            "kl2_s":kl2_s,
            "kl3_s":kl3_s,
            "kl4_s":kl4_s,
            "kl5_s":kl5_s,
            "kl6_s":kl6_s,
            "kl7_s":kl7_s,
            "kl8_s":kl8_s,
            "kl9_s":kl9_s,
            "kl10_s":kl10_s,
            "kl11_s":kl11_s,
            "kl12_s":kl12_s,
            "kl13_s":kl13_s,
            "kl14_s":kl14_s,
            "kl1_m":kl1_m,
            "kl2_m":kl2_m,
            "kl3_m":kl3_m,
            "kl4_m":kl4_m,
            "kl5_m":kl5_m,
            "kl6_m":kl6_m,
            "kl7_m":kl7_m,
            "kl8_m":kl8_m,
            "kl9_m":kl9_m,
            "kl10_m":kl10_m,
            "kl11_m":kl11_m,
            "kl12_m":kl12_m,
            "kl13_m":kl13_m,
            "kl14_m":kl14_m
        }
        indT1 = Tutor.query.filter_by(state="Andaman & Nicobar").count()
        indT2 = Tutor.query.filter_by(state="Andhra Pradesh").count()
        indT3 = Tutor.query.filter_by(state="Arunachal Pradesh").count()
        indT4 = Tutor.query.filter_by(state="Assam").count()
        indT5 = Tutor.query.filter_by(state="Bihar").count()
        indT6 = Tutor.query.filter_by(state="Punjab").count()
        indT7 = Tutor.query.filter_by(state="Chattisgarh").count()
        indT8 = Tutor.query.filter_by(state="Dadra & Nagar Haveli").count()
        indT9 = Tutor.query.filter_by(state="Daman & Diu").count()
        indT10 = Tutor.query.filter_by(state="Delhi").count()
        indT11 = Tutor.query.filter_by(state="Goa").count()
        indT12 = Tutor.query.filter_by(state="Gujarat").count()
        indT13 = Tutor.query.filter_by(state="Haryana").count()
        indT14 = Tutor.query.filter_by(state="Himachal Pradesh").count()
        indT15 = Tutor.query.filter_by(state="Jammu & Kashmir").count()
        indT16 = Tutor.query.filter_by(state="Jharkhand").count()
        indT17 = Tutor.query.filter_by(state="Karnataka").count()
        indT18 = Tutor.query.filter_by(state="Kerala").count()
        indT19 = Tutor.query.filter_by(state="Lakshadweep").count()
        indT20 = Tutor.query.filter_by(state="Madhya Pradesh").count()
        indT21 = Tutor.query.filter_by(state="Maharashtra").count()
        indT22 = Tutor.query.filter_by(state="Manipur").count()
        indT23 = Tutor.query.filter_by(state="Meghalaya").count()
        indT24 = Tutor.query.filter_by(state="Mizoram").count()
        indT25 = Tutor.query.filter_by(state="Nagaland").count()
        indT26 = Tutor.query.filter_by(state="Odisha").count()
        indT27 = Tutor.query.filter_by(state="Tamil Nadu").count()
        indT28 = Tutor.query.filter_by(state="Rajasthan").count()
        indT29 = Tutor.query.filter_by(state="Sikkim").count()
        indT30 = Tutor.query.filter_by(state="Telangana").count()
        indT31 = Tutor.query.filter_by(state="Tripura").count()
        indT32 = Tutor.query.filter_by(state="Uttar Pradesh").count()
        indT33 = Tutor.query.filter_by(state="Uttarakhand").count()
        indT34 = Tutor.query.filter_by(state="West Bengal").count()

        indS1 = Customer.query.filter_by(state="Andaman & Nicobar").count()
        indS2 = Customer.query.filter_by(state="Andhra Pradesh").count()
        indS3 = Customer.query.filter_by(state="Arunachal Pradesh").count()
        indS4 = Customer.query.filter_by(state="Assam").count()
        indS5 = Customer.query.filter_by(state="Bihar").count()
        indS6 = Customer.query.filter_by(state="Punjab").count()
        indS7 = Customer.query.filter_by(state="Chattisgarh").count()
        indS8 = Customer.query.filter_by(state="Dadra & Nagar Haveli").count()
        indS9 = Customer.query.filter_by(state="Daman & Diu").count()
        indS10 = Customer.query.filter_by(state="Delhi").count()
        indS11 = Customer.query.filter_by(state="Goa").count()
        indS12 = Customer.query.filter_by(state="Gujarat").count()
        indS13 = Customer.query.filter_by(state="Haryana").count()
        indS14 = Customer.query.filter_by(state="Himachal Pradesh").count()
        indS15 = Customer.query.filter_by(state="Jammu & Kashmir").count()
        indS16 = Customer.query.filter_by(state="Jharkhand").count()
        indS17 = Customer.query.filter_by(state="Karnataka").count()
        indS18 = Customer.query.filter_by(state="Kerala").count()
        indS19 = Customer.query.filter_by(state="Lakshadweep").count()
        indS20 = Customer.query.filter_by(state="Madhya Pradesh").count()
        indS21 = Customer.query.filter_by(state="Maharashtra").count()
        indS22 = Customer.query.filter_by(state="Manipur").count()
        indS23 = Customer.query.filter_by(state="Meghalaya").count()
        indS24 = Customer.query.filter_by(state="Mizoram").count()
        indS25 = Customer.query.filter_by(state="Nagaland").count()
        indS26 = Customer.query.filter_by(state="Odisha").count()
        indS27 = Customer.query.filter_by(state="Tamil Nadu").count()
        indS28 = Customer.query.filter_by(state="Rajasthan").count()
        indS29 = Customer.query.filter_by(state="Sikkim").count()
        indS30 = Customer.query.filter_by(state="Telangana").count()
        indS31 = Customer.query.filter_by(state="Tripura").count()
        indS32 = Customer.query.filter_by(state="Uttar Pradesh").count()
        indS33 = Customer.query.filter_by(state="Uttarakhand").count()
        indS34 = Customer.query.filter_by(state="West Bengal").count()
        
        indM1 = Marketer.query.filter_by(state="Andaman & Nicobar").count()
        indM2 = Marketer.query.filter_by(state="Andhra Pradesh").count()
        indM3 = Marketer.query.filter_by(state="Arunachal Pradesh").count()
        indM4 = Marketer.query.filter_by(state="Assam").count()
        indM5 = Marketer.query.filter_by(state="Bihar").count()
        indM6 = Marketer.query.filter_by(state="Punjab").count()
        indM7 = Marketer.query.filter_by(state="Chattisgarh").count()
        indM8 = Marketer.query.filter_by(state="Dadra & Nagar Haveli").count()
        indM9 = Marketer.query.filter_by(state="Daman & Diu").count()
        indM10 = Marketer.query.filter_by(state="Delhi").count()
        indM11 = Marketer.query.filter_by(state="Goa").count()
        indM12 = Marketer.query.filter_by(state="Gujarat").count()
        indM13 = Marketer.query.filter_by(state="Haryana").count()
        indM14 = Marketer.query.filter_by(state="Himachal Pradesh").count()
        indM15 = Marketer.query.filter_by(state="Jammu & Kashmir").count()
        indM16 = Marketer.query.filter_by(state="Jharkhand").count()
        indM17 = Marketer.query.filter_by(state="Karnataka").count()
        indM18 = Marketer.query.filter_by(state="Kerala").count()
        indM19 = Marketer.query.filter_by(state="Lakshadweep").count()
        indM20 = Marketer.query.filter_by(state="Madhya Pradesh").count()
        indM21 = Marketer.query.filter_by(state="Maharashtra").count()
        indM22 = Marketer.query.filter_by(state="Manipur").count()
        indM23 = Marketer.query.filter_by(state="Meghalaya").count()
        indM24 = Marketer.query.filter_by(state="Mizoram").count()
        indM25 = Marketer.query.filter_by(state="Nagaland").count()
        indM26 = Marketer.query.filter_by(state="Odisha").count()
        indM27 = Marketer.query.filter_by(state="Tamil Nadu").count()
        indM28 = Marketer.query.filter_by(state="Rajasthan").count()
        indM29 = Marketer.query.filter_by(state="Sikkim").count()
        indM30 = Marketer.query.filter_by(state="Telangana").count()
        indM31 = Marketer.query.filter_by(state="Tripura").count()
        indM32 = Marketer.query.filter_by(state="Uttar Pradesh").count()
        indM33 = Marketer.query.filter_by(state="Uttarakhand").count()
        indM34 = Marketer.query.filter_by(state="West Bengal").count()

        states = {
            "indM1":indM1,
            "indM10":indM10,
            "indM11":indM11,
            "indM12":indM12,
            "indM13":indM13,
            "indM14":indM14,
            "indM15":indM15,
            "indM16":indM16,
            "indM17":indM17,
            "indM18":indM18,
            "indM19":indM19,
            "indM2":indM2,
            "indM20":indM20,
            "indM21":indM21,
            "indM22":indM22,
            "indM23":indM23,
            "indM24":indM24,
            "indM25":indM25,
            "indM26":indM26,
            "indM27":indM27,
            "indM28":indM28,
            "indM29":indM29,
            "indM3":indM3,
            "indM30":indM30,
            "indM31":indM31,
            "indM32":indM32,
            "indM33":indM33,
            "indM34":indM34,
            "indM4":indM4,
            "indM5":indM5,
            "indM6":indM6,
            "indM7":indM7,
            "indM8":indM8,
            "indM9":indM9,
            "indS1":indS1,
            "indS10":indS10,
            "indS11":indS11,
            "indS12":indS12,
            "indS13":indS13,
            "indS14":indS14,
            "indS15":indS15,
            "indS16":indS16,
            "indS17":indS17,
            "indS18":indS18,
            "indS19":indS19,
            "indS2":indS2,
            "indS20":indS20,
            "indS21":indS21,
            "indS22":indS22,
            "indS23":indS23,
            "indS24":indS24,
            "indS25":indS25,
            "indS26":indS26,
            "indS27":indS27,
            "indS28":indS28,
            "indS29":indS29,
            "indS3":indS3,
            "indS30":indS30,
            "indS31":indS31,
            "indS32":indS32,
            "indS33":indS33,
            "indS34":indS34,
            "indS4":indS4,
            "indS5":indS5,
            "indS6":indS6,
            "indS7":indS7,
            "indS8":indS8,
            "indS9":indS9,
            "indT1":indT1,
            "indT10":indT10,
            "indT11":indT11,
            "indT12":indT12,
            "indT13":indT13,
            "indT14":indT14,
            "indT15":indT15,
            "indT16":indT16,
            "indT17":indT17,
            "indT18":indT18,
            "indT19":indT19,
            "indT2":indT2,
            "indT20":indT20,
            "indT21":indT21,
            "indT22":indT22,
            "indT23":indT23,
            "indT24":indT24,
            "indT25":indT25,
            "indT26":indT26,
            "indT27":indT27,
            "indT28":indT28,
            "indT29":indT29,
            "indT3":indT3,
            "indT30":indT30,
            "indT31":indT31,
            "indT32":indT32,
            "indT33":indT33,
            "indT34":indT34,
            "indT4":indT4,
            "indT5":indT5,
            "indT6":indT6,
            "indT7":indT7,
            "indT8":indT8,
            "indT9":indT9,
        }


        today_t=Tutor.query.filter_by(date=datetime.utcnow().date()).count()
        today_s=Customer.query.filter_by(date=datetime.utcnow().date()).count()
        today_m=Marketer.query.filter_by(date=datetime.utcnow().date()).count()
        today={
            "tutor":today_t,
            "student":today_s,
            "marketer":today_m
        }
        total_t=Tutor.query.count()
        total_s=Customer.query.count()
        total_m=Marketer.query.count()

        total={
            "tutor":total_t,
            "student":total_s,
            "marketer":total_m
        }
        # today_t=datetime.now()

        return render_template('dashboard.html',district=district,today=today,total=total,states=states)
    except:
        return redirect('/admin/login')

@app.route('/admin/tutors',methods=['GET','POST'])
def admintut():
    try:
        user=session['admin']
        adm=Admin.query.filter_by(username=user).first()
        if(adm):
            tutor=Tutor.query.filter_by(isvarify=False, isactive=True).all()
            return render_template('admnon.html',users=tutor, tutor="true")
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')
@app.route('/admin/students',methods=['GET','POST'])
def adminstud():
    try:
        user=session['admin']
        adm=Admin.query.filter_by(username=user).first()
        if(adm):
            stud=Customer.query.filter_by(tutor=None, isactive=True).all()
            return render_template('admnon.html',users=stud, student="true")
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')

@app.route('/admin/marketers',methods=['GET','POST'])
def adminmark():
    try:
        user=session['admin']
        adm=Admin.query.filter_by(username=user).first()
        if(adm):
            mark = Marketer.query.filter_by(isvarify=False, isactive=True).all()
            return render_template('admnon.html',users=mark, marketer="true")
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')

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
        print(username+"\n"+password)
        try:        
            user=Admin.query.filter_by(username=username).first()
            print(user.username)
            if (check_password_hash(user.password,password)):
                session['admin']=username
                return redirect('/admin')
            else:
                flash("Username or password error!")
                return redirect('/admin')
        except:
            flash("Username or password error!")
            return redirect('/admin')
    else:
        session.pop('admin',None)
        path="/admin/login"
        heading="Admin Login"
        return render_template('login.html', path=path, heading= heading)
        
@app.route("/admin/tutsearch", methods=["POST"])
def tutsh():
    if request.method == "POST":
        sh=request.form.get("search")
        course=Tutor.query.filter(Tutor.tuition.contains(sh)).all()
        names=Tutor.query.filter(Tutor.fname.contains(sh)).all()
        location=Tutor.query.filter(Tutor.location.contains(sh)).all()  
        block=Tutor.query.filter(Tutor.block.contains(sh)).all()  
        district=Tutor.query.filter(Tutor.district.contains(sh)).all()
        state=Tutor.query.filter(Tutor.state.contains(sh)).all()  
        username=Tutor.query.filter(Tutor.username.contains(sh)).all()
        qualific=Tutor.query.filter(Tutor.qualification.contains(sh)).all()
        search={
            "course":course,
            "names":names,
            "location":location,
            "block":block,
            "district":district,
            "state":state,
            "username":username,
            "qualific":qualific
        }
        return render_template("admnon.html", display="none", search=search,tutor=True)

@app.route("/admin/studsearch", methods=["POST"])
def studsh():
    if request.method == "POST":
        sh=request.form.get("search")
        course=Customer.query.filter(Customer.tuition.contains(sh)).all()
        names=Customer.query.filter(Customer.fname.contains(sh)).all()
        location=Tutor.query.filter(Tutor.location.contains(sh)).all()  
        block=Tutor.query.filter(Tutor.block.contains(sh)).all()  
        district=Tutor.query.filter(Tutor.district.contains(sh)).all()
        state=Tutor.query.filter(Tutor.state.contains(sh)).all()   
        username=Customer.query.filter(Customer.username.contains(sh)).all()
        search={
            "course":course,
            "names":names,
            "location":location,
            "block":block,
            "district":district,
            "state":state,
            "username":username
        }
        return render_template("admnon.html", display="none", search=search,student=True)

@app.route("/admin/marksearch", methods=["POST"])
def marksh():
    if request.method == "POST":
        sh=request.form.get("search")
        names=Marketer.query.filter(Marketer.fname.contains(sh)).all()
        location=Tutor.query.filter(Tutor.location.contains(sh)).all()  
        block=Tutor.query.filter(Tutor.block.contains(sh)).all()  
        district=Tutor.query.filter(Tutor.district.contains(sh)).all()
        state=Tutor.query.filter(Tutor.state.contains(sh)).all()   
        username=Marketer.query.filter(Marketer.username.contains(sh)).all()
        qualific=Marketer.query.filter(Marketer.qualification.contains(sh)).all()
        search={
            "names":names,
            "location":location,
            "block":block,
            "district":district,
            "state":state,
            "username":username,
            "qualific":qualific
        }
        return render_template("admnon.html", display="none", search=search, marketer=True)

@app.route('/admin/attendance/clear', methods=['POST'])
def attendClr():
    user = request.form.get("user")
    us = Customer.query.filter_by(username=user).first()
    att = Attendence.query.filter_by(customer_id=us.id).first()
    while(att):
        db.session.delete(att)
        db.session.commit()
        att = Attendence.query.filter_by(customer_id=us.id).first()
        
    print(att)
    flash("Attendance deleted of "+us.fname)
    return redirect('/admin/tutor/'+ us.tutor)

@app.route('/admin/tutor/<int:tutid>/',methods=['GET','POST'])
def tutadid(tutid):
    try:
        user=session['admin']
        adm = Admin.query.filter_by(username=user).first()
        if(adm):
            tutor=Tutor.query.filter_by(tutid=tutid).first()
            if(tutor):
                return render_template('tutadminprof.html',tutor=tutor)
            else:
                return render_template('404.html')
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')

@app.route('/admin/student/<int:tutid>/',methods=['GET','POST'])
def studadid(studid):
    try:
        user=session['admin']
        adm = Admin.query.filter_by(username=user).first()
        if(adm):
            stud=Customer.query.filter_by(studid=studid).first()
            if(stud):
                return render_template('studadminprof.html',stud=stud)
            else:
                return render_template('404.html')
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')
            

@app.route('/admin/tutor/<username>',methods=['GET','POST'])
def adtut(username):
    try:
        user=session['admin']
        adm=Admin.query.filter_by(username=user).first()
        if(adm):
            tutor=Tutor.query.filter_by(username=username).first()
            if(tutor):
                if(tutor.ismale==True):
                    count=Tutor.query.filter_by(ismale=True, isvarify=True).count()
                    tutid=200001+count
                else:
                    count=Tutor.query.filter_by(ismale=False, isvarify=True).count()
                    tutid=400001+count
            else:
                return render_template('404.html')
            stud=Customer.query.filter_by(tutor=tutor.username).all()
            return render_template('tutadminprof.html',tutor=tutor,tutid=tutid,studs=stud)
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')


@app.route('/admin/student/<username>',methods=['GET','POST'])
def adstud(username):
    try:
        user=session['admin']
        adm = Admin.query.filter_by(username=user).first()
        if(adm):
            stud=Customer.query.filter_by(username=username).first()
            if(stud):
                return render_template('studadminprof.html',stud=stud)
            else:
                return render_template('404.html')
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')

@app.route('/admin/marketer/<usernm>',methods=['GET','POST'])
def admark(usernm):
    try:
        user=session['admin']
        print(user)
        adm=Admin.query.filter_by(username=user).first()
        if(adm):
            mark=Marketer.query.filter_by(username=usernm).first()
            if(mark):
                count=Marketer.query.filter_by(isvarify=True).count()
                markid=800001+count
                print(markid)
            else:
                return render_template('404.html')
            return render_template('markadminprof.html',mark=mark,markid=markid)
        else:
            return redirect('/admin/login')
    except:
        return redirect('/admin/login')

@app.route('/addadmin/',methods=['GET','POST'])
def addadmin():
    if request.method == "POST":
        name = request.form.get("name")
        username = request.form.get("username")
        adm=Admin.query.filter_by(username=username).first()
        if(adm):
            flash("Already Registered!")
            return redirect('/addadmin')        
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        pin = int(request.form.get("pin"))
        if(pin==8000):
            issuperadmin=True
            isvalid=True
        elif(pin==5000):
            issuperadmin=False
            isvalid=True
        else:
            isvalid=False
        if(password1 == password2 and isvalid):
            password = generate_password_hash(password1, "sha256")
            user=Admin(fname=name, username=username,password=password,issuperadmin=issuperadmin)
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/')
        else:
            flash("Password missmatch or pin invalid")
    return render_template('adminreg.html')

@app.route('/')
def home():
    tut=Tutor.query.filter_by(isvarify=True).count()
    return render_template('home.html',tut=tut)


if __name__ == '__main__':
    app.run()




    #https://ytutor.herokuapp.com/ | https://git.heroku.com/ytutor.git