//
//  SignScreenView.swift
//  SignScreenView
//
//  Created by Juan Chipoco on 13/08/21.
//

import SwiftUI

struct PressedButtonStyle: ButtonStyle {
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
    
}

struct SignScreenView: View {
    @State private var showDetailsSignIn = false
    @State private var showDetailsSignUp = false
    @State var selection: Int? = nil
    
    @State var isNavigationBarHidden: Bool = true
    
    
    
    var body: some View {
        
        NavigationView
        {
        
            
            
            VStack (alignment: .leading, spacing: 10)
            {
                Image("banner").resizable()
                    .aspectRatio(contentMode: .fit).background(Color.white)//.scaledToFill()
                    
               
                
                
                Text("Sign In or Sign Up")
                    .preferredColorScheme(.light)
                    .font(.headline)
                    .multilineTextAlignment(.leading)
                    .padding()
                
                Text("Sign Up and we will help you to be more secure.")
                    .preferredColorScheme(.light)
                    .font(.caption)
                    .multilineTextAlignment(.leading)
                    .padding()
                
               
                HStack
                {
                    
                    NavigationLink(destination: SignInView(), tag: 1, selection: $selection)
                    {
                        Button(action: {
                            print("Sign In tapped")
                            self.selection = 1
                        }) {
                            HStack {
                                Spacer()
                                Text("Sign In").foregroundColor(Color.white).bold()
                                Spacer()
                            }
                        }
                        .frame(width: 80, height: 15, alignment: .center)
                        .foregroundColor(.white)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(8)
                        .shadow(radius: 10)
                        .offset(x: 10)
                    }
                   
                    NavigationLink(destination: SignUpView(register: Register()), tag: 2, selection: $selection)
                    {
                        Button(action: {
                            print("Sign Up tapped")
                            self.selection = 2
                        }) {
                            HStack {
                                Spacer()
                                Text("Sign Up").foregroundColor(Color.white).bold()
                                Spacer()
                            }
                        }
                        .frame(width: 80, height: 15, alignment: .center)
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
     
        }
        .accentColor( .white)
        .frame(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                  
        
    }
}




struct SignScreenView_Previews: PreviewProvider {
    static var previews: some View {
        SignScreenView()
    }
}
