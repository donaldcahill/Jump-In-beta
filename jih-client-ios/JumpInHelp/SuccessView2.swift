//
//  SuccessView2.swift
//  JumpInHelp
//
//  Created by Juan Chipoco on 15/11/21.
//

import SwiftUI

/*struct PressedButtonStyle2: ButtonStyle {
    let touchDown: () -> ()
    func makeBody(configuration: Self.Configuration) -> some View {
        configuration.label
            .foregroundColor(configuration.isPressed ? Color.gray : Color.blue)
            .background(configuration.isPressed ? self.handlePressed() : Color.clear)
    }

    private func handlePressed() -> Color {
        touchDown()           // << here !!
        return Color.clear
    }
    
}*/

struct SuccessView2: View {
    @State private var showDetailsSignIn = false
    @State private var showDetailsSignUp = false
    @State var selection: Int? = nil
    
    //@State var isNavigationBarHidden: Bool = true
    
    
    
    
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
        
        NavigationView
        {
        
            
            
            VStack (alignment: .leading, spacing: 10)
            {
                Image("banner").resizable()
                    .aspectRatio(contentMode: .fit).background(Color.white)//.scaledToFill()
                
                //Spinner
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .orange))
                        .scaleEffect(3)
                    
                }
                    
                Text("Contact an operator...")
                    .preferredColorScheme(.light)
                    .font(.headline)
                    .multilineTextAlignment(.leading)
                    .padding()
                    .offset(x: 20)
                
               
                HStack
                {
                    
                    NavigationLink(destination: SignInView(), tag: 1, selection: $selection)
                    {
                        Button(action: {
                            print("Start tapped")
                            //isLoading = true
                            
                        }) {
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
                        .offset(x: 10)
                    }
                   
                    NavigationLink(destination: ContentView(), isActive: self.$showTips)
                    {
                        Button(action: {
                            print("Close session tapped")
                            debugPrint("Starting: Perform you action here")
                            showSessionAlert = true
                          
                        }) {
                            HStack {
                                Spacer()
                                Text("Close Session").foregroundColor(Color.white).bold()
                                Spacer()
                            }
                        }
                        .frame(width: 140, height: 15, alignment: .center)
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(8)
                        .shadow(radius: 10)
                        .offset(x: 10)
                    }
                   
                   
                }
                .background(Color.white)
                Spacer()
            }
            .navigationBarTitle("", displayMode: .inline)
            .navigationBarColor(backgroundColor: Color.init(red: 8.0/255.0, green: 14.0/255.0, blue: 38.0/255.0), titleColor: .white)
            .onAppear {
                /*self.isNavigationBarHidden = true*/
            }
            .statusBar(hidden: false)
            .navigationViewStyle(StackNavigationViewStyle())
            .background(Color.white.ignoresSafeArea(.all))
            //.edgesIgnoringSafeArea(.all)
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
     
        }
        .accentColor( .white)
        .frame(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                  
        
    }
    
    func startFakeNetworkCall() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            isLoading = false
        }
    }
}




/*struct SignScreenView_Previews: PreviewProvider {
    static var previews: some View {
        SignScreenView()
    }
}*/

