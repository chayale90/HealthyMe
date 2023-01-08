# descriptiom of special components

1. CheckUserComp
    check every component in client side 
    if the the role of user you can see the layout -just foodList page
    if not he will arrive to login page

  


2. CheckUserActiveComp
    check every component in client side 
    if the the role of user and: active==true
     you can see the layout 
    if he not user he will arrive to login page
    if he dosn't active he will arrive foods page


3.   MyInfo comp - provide details of user(that login) to all components.
    use with redux.


  put this component in pages:
  foodList: CheckUserComp   v
  myProfile:CheckUserComp   v
  editProfile: CheckUserActiveComp
  addFood: CheckUserActiveComp





  in the end:
  to delete uploadTest from admin
