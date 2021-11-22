//
//  SuccessView.swift
//  SuccessView
//
//  Created by Juan Chipoco on 9/11/21.
//

import Foundation
import SwiftUI

struct SuccessView: View {
    
    @State private var currentPosition: CGSize = .zero
    @State private var newPosition: CGSize = .zero
    
    
    @State private var showSessionAlert = false
    @State private var showAlert = false
    @State private var showingOpUnavailable = false
    @State private var showingOpAvailable = false
    
    let userDefaults = UserDefaults()
    @State var user = ""
    @ObservedObject var  register = Register()
    @State var language = ""
    @State var showTips: Bool = false
    
    @State var isNavigationBarHidden: Bool = true
    
    @State var shouldScroll: Bool = false
    
    @State private var isLoading = false
    
    var body: some View {
        
        
        NavigationLink(destination: ContentView(), isActive: self.$showTips) { EmptyView() }
        
        NavigationView
        {
           
            
            ScrollView (axes, showsIndicators: false)
            {
                
                
                VStack (alignment: .leading, spacing: 10)
                {
                    
                   
                    Image("banner").resizable()
                        .aspectRatio(contentMode: .fit)//.background(Color.white)//.scaledToFill()
                    
                    
                    
                    Text("Contact an operator...")
                        .preferredColorScheme(.light)
                        .font(.headline)
                        .multilineTextAlignment(.leading)
                        .padding()
                        .offset(x: 20)
                    
                    
                    
                    
                    HStack (alignment: .center, spacing: 10)
                    {
                        
                        
                        
                        Button(action: {
                            
                            debugPrint("Starting: Perform you action here")
                            
                            isLoading = true
                            
                            startFakeNetworkCall()
                            
                            register.loadOperators(language: language){ state in
                                
                                // do something with the returned Bool
                                print("RESPONSE OPERATOR: ",state)
                                print("BACK FROM WEB API OPERATOR")
                                
                                isLoading = false
                                
                                if state == 0 {
                                    print("Can't call")
                                    showAlert = true
                                    showingOpUnavailable = true
                                    showingOpAvailable = false
                                }
                                else {
                                    print("Can call")
                                    showAlert = false
                                    showingOpAvailable = false
                                    showingOpUnavailable = false
                                    
                                    let phoneNumber = "59175145987"
                                    let phone = "tel://"
                                    let phoneNumberformatted = phone + phoneNumber
                                    guard let url = URL(string: phoneNumberformatted) else { return }
                                    UIApplication.shared.open(url)
                                    
                                }
                                
                                print("AFTER CALLING WEB API")
                                
                                DispatchQueue.main.async {
                                    UIApplication.shared.registerForRemoteNotifications()
                                }
                            }
                            
                        })
                        {
                            HStack {
                                Spacer()
                                Text("Start").foregroundColor(Color.white).bold()
                                Spacer()
                            }
                           
                        }
                        .frame(width: 100, height: 15, alignment: .center)
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(8)
                        .shadow(radius: 10)
                        .offset(x: 35)
                        
                        
                        
                        //Spinner
                        if isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .orange))
                                .scaleEffect(3)
                                
                            
                        }
                        
                        
                        
                        
                        
                        Button(action: {
                            
                            debugPrint("Starting: Perform you action here")
                            showSessionAlert = true
                            
                        }){
                            HStack {
                                Spacer()
                                Text("Close Session").foregroundColor(Color.white).bold()
                                Spacer()
                            }
                            .frame(width: 140, height: 15, alignment: .center)
                            .foregroundColor(.white)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(8)
                            .shadow(radius: 10)
                            .offset(x: 35)
                           
                        }
                    }
                    
                    Spacer()
                }
                .background(Color.white.ignoresSafeArea(.all))
                .edgesIgnoringSafeArea(.all)
                .alert(isPresented: $showAlert) {
                    print("ALERT 1 : ", self.showingOpUnavailable)
                    print("ALERT 2: ", self.showingOpAvailable)
                    if self.showingOpUnavailable {
                        print("Here 1")
                        return Alert(title: Text("Important message"), message: Text("Operator unavailable"), dismissButton: .default(Text("Got it!")))/*{
                            self.showingOpAvailable = false
                        })*/
                    }
                    /*else if self.showingOpAvailable {
                        print("Here 2")
                        return Alert(title: Text("Important message"), message: Text("Operator available"), dismissButton: .default(Text("Got it!")){
                      
                            //self.showOpMessage = true
                            //currentPage = 5
                            //print("Ok Click", self.showLogin)
                        })
                    }*/
                    else{
                        return Alert(title: Text("Important message"), message: Text("Undefined Error"), dismissButton: .default(Text("Got it!")))
                        
                    }
                }
                .alert(isPresented: $showSessionAlert) {
                    
                    print(self.$showSessionAlert)
                    if self.showSessionAlert {
                        return Alert(
                            title: Text("Title"),
                            message: Text("Are you sure you want to close your session?"),
                            primaryButton: .destructive(Text("Dismiss"), action: {
                                
                            }),
                            secondaryButton: .default(Text("OK"), action: {
                                self.userDefaults.setValue("", forKey: "user")
                                self.userDefaults.setValue("", forKey: "password")
                                self.userDefaults.setValue("", forKey: "language")
                                
                                user = userDefaults.object(forKey: "user") as? String ?? String()
                                print("USER: ", user)
                                
                                self.showTips = true
                                print(showTips)
                                
                            })
                            
                        )
                    }
                    else
                    {
                        return Alert(title: Text("Important message"), message: Text("Undefined Error"), dismissButton: .default(Text("Got it!")))
                            
                    }
                    
                }
                
                
                //Image(systemName: "plus.circle.fill")
                Image("phoneCall")
                //Image(systemName: "phone.connection")
                .resizable()
                .foregroundColor(.blue)
                .frame(width: 64, height: 64)
                .offset(x: self.currentPosition.width, y:self.currentPosition.height)
                .onTapGesture(perform: {
                    debugPrint("Perform you action here")
                    
                
                    register.loadOperators(language: language) { state in
                        
                        // do something with the returned Bool
                        print("RESPONSE OPERATOR: ",state)
                        print("BACK FROM WEB API OPERATOR")
                        
                        if state == 0 {
                            print("Can't call")
                            showAlert = true
                            showingOpUnavailable = true
                            showingOpAvailable = false
                        }
                        else {
                            print("Can call")
                            showAlert = false
                            showingOpAvailable = false
                            showingOpUnavailable = false
                            
                            let phoneNumber = "59175145987"
                            let phone = "tel://"
                            let phoneNumberformatted = phone + phoneNumber
                            guard let url = URL(string: phoneNumberformatted) else { return }
                            UIApplication.shared.open(url)
                            
                        }
                        
                        print("AFTER CALLING WEB API")
                        
                        DispatchQueue.main.async {
                            UIApplication.shared.registerForRemoteNotifications()
                        }
                       
                    }
             
                })
                .shadow(color: Color.black.opacity(0.3), radius: 0.3, x: 1, y: 1)
                .gesture(DragGesture()
                .onChanged { value in
                          self.currentPosition = CGSize(width: value.translation.width + self.newPosition.width,
                                                        height: value.translation.height + self.newPosition.height)
                }
                .onEnded { value in
                      self.currentPosition = CGSize(width: value.translation.width + self.newPosition.width,
                                                    height: value.translation.height + self.newPosition.height)

                      self.newPosition = self.currentPosition
                })
                .onAppear{
                    language = userDefaults.object(forKey: "language") as? String ?? String()
                    print("LNG: ", language)
                }
                .alert(isPresented: $showAlert) {
                    print("ALERT 1 : ", self.showingOpUnavailable)
                    print("ALERT 2: ", self.showingOpAvailable)
                    if self.showingOpUnavailable {
                        print("Here 1")
                        return Alert(title: Text("Important message"), message: Text("Operator unavailable"), dismissButton: .default(Text("Got it!")))/*{
                            self.showingOpAvailable = false
                        })*/
                    }
                    /*else if self.showingOpAvailable {
                        print("Here 2")
                        return Alert(title: Text("Important message"), message: Text("Operator available"), dismissButton: .default(Text("Got it!")){
                      
                            //self.showOpMessage = true
                            //currentPage = 5
                            //print("Ok Click", self.showLogin)
                        })
                    }*/
                    else{
                        return Alert(title: Text("Important message"), message: Text("Undefined Error"), dismissButton: .default(Text("Got it!")))
                        
                    }
                }
            }
            .navigationBarHidden(self.isNavigationBarHidden)
        }.navigationBarTitle("", displayMode: .inline)
        .navigationBarColor(backgroundColor: Color.init(red: 8.0/255.0, green: 14.0/255.0, blue: 38.0/255.0), titleColor: .black)
        .onAppear {
            self.isNavigationBarHidden = true
        }
        .navigationBarBackButtonHidden(true)
        .statusBar(hidden: false)
        .navigationViewStyle(StackNavigationViewStyle())
        
    }
    
    
    func startFakeNetworkCall() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            isLoading = false
        }
    }
    
    private var axes: Axis.Set {
            return shouldScroll ? .horizontal : []
    }
}
