//
//  ContentView.swift
//  JumpInHelp
//
//  Created by Juan Chipoco on 13/08/21.
//

import SwiftUI
import iPaymentButton


// Total pages
//var totalPages = 3

struct ContentView: View {
    @AppStorage("currentPage") var currentPage = 1
    let color: UIColor = UIColor(red: 255/255.0, green: 255/255.0, blue: 255/255.0, alpha: 1)
    @State var animate: Bool = false
    @State var showSplash: Bool = true
    
    var body: some View {
       
        if (!showSplash) {
        
            WalkthroughScreen()
      
        }
        
        ZStack{
            Color(color)
            Image("logos-final").resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 45, height: 45, alignment: .center)
                .scaleEffect(animate ? 3 : 1)
                .animation(Animation.easeIn(duration: 2))
                .opacity(0.8)
                .background(Color.white)
            .offset(y: -0)
        }
        .edgesIgnoringSafeArea(.all)
        .opacity(showSplash ? 1 : 0)
        //.opacity(1)
        .onAppear(){
                DispatchQueue.main.asyncAfter(deadline: .now()+0.3) {
                    animate.toggle()
                }
            
                DispatchQueue.main.asyncAfter(deadline: .now()+5) {
                    currentPage = 1
                    showSplash.toggle()
                }
        }
    
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()

    }
}

//Home page ...
struct Home: View {
 
    var body: some View
    {
        Text("Welcome")
            .font(.title)
            .fontWeight(.heavy)
    }
}

//{}
struct WalkthroughScreen: View {
    @AppStorage("currentPage") var currentPage = 1
    
    @State var user = ""
    @State var email = ""
    let userDefaults = UserDefaults()
    @ObservedObject var  register = Register()
    
    @State private var showAlert = false
    
    @State private var showingSuccessMessage = false
    @State private var showingFailMessage = false
    
    @State var showLogin: Bool = false
    @State var showSuccess: Bool = false
    
    @State private var isLoading = false
    
    //@State var showSuccessView: Bool = false
    
    var body: some View
    {
        
      
            ZStack
            {
                
                //Changing between views
                if currentPage == 1 {
                    ScreenView(image:"customer", title:"Jump In Help", detail:"Thanks for joining the Jump In Help Community", bgColor:"")
                        .transition(.scale)
                }
                
                else if currentPage == 2 {
                    ScreenView(image:"consulta", title:"Jump In Help", detail:"After registering and choosing your plan you will have installed our floating help button that will appear during your phone calls", bgColor:"")
                        .transition(.scale)
                }
                
                else if currentPage == 3 {
                    ScreenView(image:"conversation", title:"Jump In Help", detail:"All you need to do is press the button and follow the steps to have your personal cyber-security expert join your call", bgColor:"")
                        .transition(.scale)
                }
                
                else if currentPage == 4 {
                    
                    //If there is a user loaded
                    if user != "" && showSuccess {
                        SuccessView2()
                    
                    }
                    else {
                        SignScreenView()
                    }
                }
                
                else if currentPage == 5 {
                    ScreenView(image:"customer", title:"Jump In Help", detail:"Thanks for joining the Jump In Help Community", bgColor:"")
                        .transition(.scale)
                }
            
                //Spinner
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .orange))
                        .scaleEffect(3)
                    
                }
                
            }.overlay(
                //Button
                Button (action: {
                    //Changing views
                    withAnimation(.easeInOut)
                    {
                        //checking ...
                        print(currentPage)
                        if currentPage <= totalPages {
                            currentPage += 1
                        }
                        else{
                            //For App testing only
                            currentPage = 1
                        }
                        
                    }
                }, label: {
                    if currentPage < 4 {
                        Image(systemName: "chevron.right")
                            .font(.system(size:20, weight: .semibold))
                            .foregroundColor(.black)
                            .frame(width: 20, height: 20)
                            .background(Color.white)
                            .clipShape(Circle())
                            //Circular Slider
                            .overlay(
                                ZStack{
                                    Circle()
                                        .stroke(Color.black.opacity(0.04), lineWidth:4)
                                        
                                    
                                    Circle()
                                        .trim(from: 0, to: CGFloat(currentPage) / CGFloat(totalPages))
                                        .stroke(Color.orange, lineWidth: 4)
                                        .rotationEffect(.init(degrees: -90))
                                }
                                .padding(-15)
                            )
                    }
                }).disabled(isLoading)
                ,alignment: .bottom
            )
            .onAppear
            {
                user = userDefaults.object(forKey: "user") as? String ?? String()
                email = userDefaults.object(forKey: "email") as? String ?? String()
                print("USER: ", user)
                print("EMAIL: ", email)
                print("CALLING VALIDATE WEB API")
                
                startFakeNetworkCall()
            
                register.postValidateUser(userid: user, email: email){ state in
                    
                    // do something with the returned Bool
                    print("RESPONSE AFTER VALIDATE: ",state)
                    print("BACK FROM WEB API")
                    
                    isLoading = false
                    
                    if state == 1 {
                       
                        currentPage = 4
                        showSuccess = true
                        
                        
                    }
                    else if state == 0 && currentPage == 3 {
                       
                        currentPage = 4
                        showSuccess = false
                        
                        
                    }
                    else {
                       
                        currentPage = 1
                        showSuccess = false
                     
                    }
                    
                    print("CURRENT PAGE: ", currentPage)
                    print("AFTER CALLING WEB API: ", showSuccess)
                    print("USER: ", user)
                    
                    DispatchQueue.main.async {
                       
                    }
                }
            }
            
    }
    
    func startFakeNetworkCall() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            isLoading = false
        }
    }
       
}


struct ScreenView: View {
    
    var image: String
    var title: String
    var detail: String
    var bgColor: String
    
    @State private var currentPosition: CGSize = .zero
    @State private var newPosition: CGSize = .zero
    
    @AppStorage("currentPage") var currentPage = 1
    @ObservedObject var  register = Register()
    
    let userDefaults = UserDefaults()
    @State var language = ""
    
    @State private var showAlert = false
    @State private var showingOpUnavailable = false
    @State private var showingOpAvailable = false
    
    @State var showOpMessage: Bool = false
    
    var body: some View
    {
        ZStack
        {
            VStack(spacing: 20){
                
                HStack {
                    
                      
                    //If left button is pressed
                    if currentPage == 1 {
                        Text("")//Jump In Help
                            .font(.headline)
                            .fontWeight(.heavy)
                            //Line spacing
                            .kerning(1.4)
                    }
                    else if currentPage == 2 {
                        Button(action: {
                            withAnimation(.easeInOut)
                            {
                                currentPage -= 1
                            }
                        }, label: {
                            Image(systemName: "chevron.left")
                                .foregroundColor(.white)
                                //.padding(.top, 50)
                                .padding(.vertical, 10)
                                .padding(.horizontal)
                                .background(Color.black.opacity(0.4))
                                .cornerRadius(10)
                        })
                    }
                    else if currentPage == 3 {
                        
                        Button(action: {
                            withAnimation(.easeInOut)
                            {
                                currentPage -= 1
                            }
                        }, label: {
                            Image(systemName: "chevron.left")
                                .foregroundColor(.white)
                                .padding(.vertical, 10)
                                .padding(.horizontal)
                                .background(Color.black.opacity(0.4))
                                .cornerRadius(10)
                        })
                    }
                    
                    
                    Spacer()
                    
                    //Skip
                    Button(action:{
                        withAnimation(.easeInOut)
                        {
                            currentPage = 4
                        }
                    }, label: {
                        Text("Skip")
                            .fontWeight(.light)
                            .kerning(1.2)
                    })
                    
                    
                }.foregroundColor(.black)
                    .padding()
                
                Image(image)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                
                //Spacer(minLength: 0)
                
                Text(title)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.black)
                    .padding(.top)
                
                
                Text(detail)
                    .fontWeight(.ultraLight)
                    .kerning(1.3)
                    .padding()
                    .multilineTextAlignment(.center)
                
                
                //Minimum Spacing when phone is reducing
                Spacer(minLength: 90)
            }
            .background(Color.white.cornerRadius(10).ignoresSafeArea())
            .onAppear{
                language = userDefaults.object(forKey: "language") as? String ?? String()
                print("LNG: ", language)
                print("PAGE: ", currentPage)
             
                
                if currentPage == 3 {
                    //currentPage += 1
                }
                
                
            }
            
        }
        .alert(isPresented: $showAlert) {
            print("ALERT: ", self.showingOpUnavailable)
            print("ALERT: ", self.showingOpAvailable)
            if self.showingOpUnavailable {
                print("Here 1")
                return Alert(title: Text("Important message"), message: Text("Operator unavailable"), dismissButton: .default(Text("Got it!")){
                    //self.showOpMessage = false
                })
            }
            else if self.showingOpAvailable {
                print("Here 2")
                return Alert(title: Text("Important message"), message: Text("Operator available"), dismissButton: .default(Text("Got it!")){
              
                    //self.showOpMessage = true
                    //currentPage = 5
                    //print("Ok Click", self.showLogin)
                })
            }
            else{
                return Alert(title: Text("Important message"), message: Text("Undefined Error"), dismissButton: .default(Text("Got it!")))
                
            }
        }
    
    }
}

// Total pages
var totalPages = 3
