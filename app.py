from flask import Flask, render_template, url_for, request, redirect, Response, session, flash
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
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/yt'
else:
    app.debug=False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://iahokrwmwmjwyc:409d165249b6611305076aff424a5ce1c3f1da69932a60e5c1abaa97ab3f7d9b@ec2-52-7-39-178.compute-1.amazonaws.com:5432/d48sfsj0rh8h87'


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
    extra = db.Column(db.String(100), nullable = True)
    image = db.Column(db.String(800000), nullable = False, default = 'False')
    student = db.Column(db.String(30),  nullable=True)
    earn = db.Column(db.Float,default = 0)
    totalearn = db.Column(db.Float,default = 0)
    date = db.Column(db.DateTime,nullable = False,default = datetime.utcnow)
    isvarify = db.Column(db.Boolean, nullable = True, default = False)
    ismale = db.Column(db.Boolean, nullable = False)
    isindian = db.Column(db.Boolean, nullable = True, default = True)
    nonindplace = db.Column(db.String(20),nullable=True) 
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
    tutor = db.Column(db.String(30),nullable=True)
    attend = db.Column(db.Integer,nullable=True)
    tudattend = db.Column(db.Integer,nullable=True)
    parent = db.Column(db.String(30), nullable=False)
    date = db.Column(db.DateTime,nullable=False, default = datetime.utcnow)
    ismale = db.Column(db.Boolean, nullable=False)
    isactive = db.Column(db.Boolean, default = True)

class Marketer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Markid = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(30), unique=True, nullable=False)
    fname = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(300), nullable=False)
    dob = db.Column(db.DateTime, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    district = db.Column(db.String(30), nullable=False)
    taluk = db.Column(db.String(30), nullable=False)
    village = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(800000), nullable=False, default='False')
    qualification = db.Column(db.String(50), nullable = False)
    isvarify = db.Column(db.Boolean, nullable = True, default = False)
    isactive = db.Column(db.Boolean, default = True)
    ismale = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.DateTime,nullable=False, default = datetime.utcnow)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(300), nullable=False)    

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

@app.route('/student/assign',methods=['POST'])
def tutassign():
    if request.method == "POST" :
        user=request.form.get("username")
        tutname=request.form.get("tutname")
        admin = Customer.query.filter_by(username=user).first()
        admin.tutor = tutname
        db.session.commit()
        tut=Tutor.query.filter_by(username=tutname).first()
        messegeEmail="Helo " + admin.fname + " your ID and Username is \n " + str(admin.tutid) + " and " + admin.username + "\nWe assigned a tutor for you named "+ tut.fname +" . \nThankyou :)"
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

@app.route('/student/delete',methods=['GET','POST'])
def studdelete():
    if request.method == "POST" :
        user=request.form.get("username")
        admin = Customer.query.filter_by(username=user).update(dict(isactive=False))
        db.session.commit()
        return redirect('/admin/student/'+user)

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

@app.route('/marketer/',methods=['GET','POST'])
def marketer():
    try:
        user = session['marketer']
        mark = Marketer.query.filter_by(username=user).first()
        return render_template('markprof.html',user=mark)
        # return redirect('/')
    except:
        return redirect('/marketer/login')

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
        todaydate = datetime.utcnow().date()
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
            user=Tutor(fname=name, username=username, email=email, password=password, dob=dob, date=todaydate, phone=phone, qualification=qualification, district=district, taluk=block, village=location, tuition=tuition, maths=maths, science=science, social=social, computer=computer, physics=physics, chemistry=chemistry, biology=biology, scmaths=scmaths, extra=extra, image=image, ismale=ismale )            
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/tutor')
        else:
            return render_template('tutReg.html',student='active', messege="Password missmatch")

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
        except:
            return render_template('studReg.html', messege="PIN Code Invalid", student='active')
        count=Customer.query.count()
        studid=600001+count
        if(password1 == password2):
            password = generate_password_hash(password1, "sha256")
            user=Customer(fname=name, username=username, studid=studid, email=email, password=password, dob=dob, date=todaydate, phone=phone, district=district, taluk=block, village=location, tuition=tuition, image=image, ismale=ismale, parent=parent )            
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
        except:
            flash('Pincode invalid')
            return redirect('/marketer/register')
        if(password1 == password2):
            password = generate_password_hash(password1, "sha256")
            user=Marketer(fname=name, username=username, email=email, password=password, dob=dob, date=todaydate, phone=phone, district=district, taluk=block, village=location, image=image, ismale=ismale, qualification=qualification)            
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/marketer/login')
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

        return render_template('dashboard.html',district=district,today=today,total=total )
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
        village=Tutor.query.filter(Tutor.village.contains(sh)).all()  
        taluk=Tutor.query.filter(Tutor.taluk.contains(sh)).all()  
        district=Tutor.query.filter(Tutor.district.contains(sh)).all()  
        username=Tutor.query.filter(Tutor.username.contains(sh)).all()
        qualific=Tutor.query.filter(Tutor.qualification.contains(sh)).all()
        search={
            "course":course,
            "names":names,
            "village":village,
            "taluk":taluk,
            "district":district,
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
        village=Customer.query.filter(Customer.village.contains(sh)).all()  
        taluk=Customer.query.filter(Customer.taluk.contains(sh)).all()  
        district=Customer.query.filter(Customer.district.contains(sh)).all()  
        username=Customer.query.filter(Customer.username.contains(sh)).all()
        search={
            "course":course,
            "names":names,
            "village":village,
            "taluk":taluk,
            "district":district,
            "username":username
        }
        return render_template("admnon.html", display="none", search=search,student=True)

@app.route("/admin/marksearch", methods=["POST"])
def marksh():
    if request.method == "POST":
        sh=request.form.get("search")
        names=Marketer.query.filter(Marketer.fname.contains(sh)).all()
        village=Marketer.query.filter(Marketer.village.contains(sh)).all()  
        taluk=Marketer.query.filter(Marketer.taluk.contains(sh)).all()  
        district=Marketer.query.filter(Marketer.district.contains(sh)).all()  
        username=Marketer.query.filter(Marketer.username.contains(sh)).all()
        qualific=Marketer.query.filter(Marketer.qualification.contains(sh)).all()
        search={
            "names":names,
            "village":village,
            "taluk":taluk,
            "district":district,
            "username":username,
            "qualific":qualific
        }
        return render_template("admnon.html", display="none", search=search, marketer=True)

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
            return render_template('tutadminprof.html',tutor=tutor,tutid=tutid)
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
        pin = request.form.get("pin")
        if(password1 == password2 and pin=="5000"):
            password = generate_password_hash(password1, "sha256")
            user=Admin(fname=name, username=username,password=password)
            db.session.add(user)
            db.session.commit()
            print('commited')
            return redirect('/')
        else:
            flash("Password missmatch or pin invalid")
    return render_template('adminreg.html')

@app.route('/')
def home():
    return render_template('home.html')


if __name__ == '__main__':
    app.run()




    #https://ytutor.herokuapp.com/ | https://git.heroku.com/ytutor.git