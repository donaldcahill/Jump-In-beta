//
//  SignInView.swift
//  SignInView
//
//  Created by Juan Chipoco on 15/08/21.
//

import SwiftUI
import Combine



struct SignInView: View {
    
    @ObservedObject var  register = Register()
    
    @State var email = ""
    @State var pass = ""
    
    @FocusState private var emailIsFocused: Bool
    @FocusState private var passIsFocused: Bool
    @State private var isEmailValid : Bool   = true
    
    @State private var showAlert = false
    @State private var showingEmailAlert = false
    @State private var showingPasswordAlert = false
    
    @State private var showingLoginSuccessMessage = false
    @State private var showingLoginFailMessage = false
    
    @State var showSuccessView: Bool = false
    
    @State var isNavigationBarHidden: Bool = true
    
    @State private var isLoading = false
    
    var body: some View {
        
        NavigationLink(destination: SuccessView(), isActive: self.$showSuccessView) { EmptyView() }
        
        NavigationView
        {
            ScrollView
            {
                VStack
                {
                    Image("banner").resizable()
                    .aspectRatio(contentMode: .fit)//.background(Color.white)
                    
                    //Spinner
                    if isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .orange))
                            .scaleEffect(3)
                        
                    }
                
                    VStack
                    {
                        VStack
                        {
                            
                            VStack{
                                Text("Sign In")
                                    .foregroundColor(Color.blue)
                                    .font(.system(size: 20))
                                    .multilineTextAlignment(.leading)
                                    .padding()
                               
                                
                            }
                            .padding(.top, 0) //For top curve
                            
                            VStack
                            {
                                
                                HStack (spacing: 15){
                                    Image(systemName: "envelope.fill")
                                        .foregroundColor(Color.blue)
                                    
                                    TextField("Enter your username", text: self.$email, onEditingChanged: { (isChanged) in
                                        if !isChanged {
                                            if self.textFieldValidatorEmail(self.email) {
                                                self.isEmailValid = true
                                                print("VALID: ", self.isEmailValid)
                                            } else {
                                                self.isEmailValid = false
                                                self.email = ""
                                                print("NOT VALID: ",self.isEmailValid)
                                            }
                                        }
                                    })
                                    .accentColor(.black)
                                    .preferredColorScheme(.light)
                                    .textContentType(.emailAddress)
                                    .keyboardType(.emailAddress)
                                    .foregroundColor(Color.black)
                                    .focused($emailIsFocused)
                                    .frame(height: 3)
                                    .padding()
                                    
                                    if !self.isEmailValid {
                                        Text("Email is Not Valid")
                                            .font(.callout)
                                            .foregroundColor(Color.red)
                                        
                                        
                                    }
                                        
                                }
                                
                                Divider().background(Color.white.opacity(0.5))
                            }
                            .padding(.horizontal)
                            .padding(.top, 10)
                            
                            VStack
                            {
                                HStack (spacing: 15){
                                    Image(systemName: "lock.fill")
                                        .foregroundColor(Color.blue)
                                    
                                    SecureField("Enter your Password", text: self.$pass)
                                        .accentColor(.black)
                                        .preferredColorScheme(.light)
                                        .textContentType(.password)
                                        .foregroundColor(Color.black)
                                        .focused($passIsFocused)
                                        .frame(height: 3)
                                        .padding()
                                }
                                Divider().background(Color.white.opacity(0.5))
                            }
                            .padding(.horizontal)
                            .padding(.top, 10)
                            
                            
                        }
                       
                        .padding()
                        .padding(.bottom, 65)
                        .padding(.horizontal, 20)
                    
                        //Spacer()
                    
                        //Button
                        Button(action: {
                            isLoading = true
                            
                            emailIsFocused = false
                            passIsFocused = false
                            
                            showingEmailAlert = false
                            showingPasswordAlert = false
                            
                            if(!self.isEmailValid){
                                print("Email is Not Valid")
                                showAlert = true
                                showingEmailAlert = true
                            }
                            
                            else if(email == ""){
                                print("Email is Not Valid")
                                showAlert = true
                                showingEmailAlert = true
                            }
                            
                            else if(pass == ""){
                                print("Email Not Valid")
                                showAlert = true
                                showingPasswordAlert = true
                            }
                            else{
                                print("CALLING WEB API")
                                print(email)
                                print(pass)
                                
                                
                                
                                startFakeNetworkCall()
                                
                                register.postLoginUser(username: email, password: pass) { state in
                                    
                                    // do something with the returned Bool
                                    print("RESPONSE: ",state)
                                    print("BACK FROM WEB API")
                                    
                                    isLoading = false
                                    
                                    if state == 1 {
                                        showAlert = true
                                        showingLoginSuccessMessage = true
                                        showingLoginFailMessage = false
                                       
                                    }
                                    else {
                                        showAlert = true
                                        showingLoginFailMessage = true
                                        showingLoginSuccessMessage = false
                                    }
                                    
                                    
                                    print("AFTER CALLING WEB API")
                                    
                                    DispatchQueue.main.async {
                                       // update UI
                                    }
                                }
                                
                               
                                
                            }
                             
                        }){
                            HStack {
                                Spacer()
                                Text("Sign In").foregroundColor(Color.white).bold()
                                
                                
                                
                                Spacer()
                            }
                            .frame(width: 80, height: 15, alignment: .center)
                            //.foregroundColor(.white)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(8)
                            .shadow(radius: 10)
                            .offset(x: 0)
                            
                        }
                    }
                    Spacer()
                }.background(Color.white.ignoresSafeArea(.all))
                .edgesIgnoringSafeArea(.all)
                .padding(0)
                .alert(isPresented: $showAlert) {
                    print(self.showingEmailAlert)
                    print(self.showingPasswordAlert)
                    if self.showingEmailAlert {
                      
                        return Alert(title: Text("Important message"), message: Text("Enter your email"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingPasswordAlert {
             
                        return Alert(title: Text("Important message"), message: Text("Enter your password"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingLoginSuccessMessage {
                       
                        return Alert(title: Text("Important message"), message: Text("Login Successful"), dismissButton: .default(Text("Got it!")){
                            print("Ok Click")
                            self.showSuccessView = true
                        })
                    }
                    else if self.showingLoginFailMessage {
                    
                        return Alert(title: Text("Important message"), message: Text("Login Failed"), dismissButton: .default(Text("Got it!")))
                    }
                    else{
                        return Alert(title: Text("Important message"), message: Text("Enter your password-"), dismissButton: .default(Text("Got it!")))
                    }
                }
            }
            .navigationBarHidden(self.isNavigationBarHidden)
            
        
        }.navigationBarTitle("", displayMode: .inline)
            .navigationBarColor(backgroundColor: Color.init(red: 8.0/255.0, green: 14.0/255.0, blue: 38.0/255.0), titleColor: .white)
           
        .onAppear {
            self.isNavigationBarHidden = true
        }
        .statusBar(hidden: false)
        .navigationViewStyle(StackNavigationViewStyle())
        
     
        
    }
    
    func startFakeNetworkCall() {
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            isLoading = false
        }
    }
    
    func textFieldValidatorEmail(_ string: String) -> Bool {
        if string.count > 100 {
            return false
        }
        let emailFormat = "(?:[\\p{L}0-9!#$%\\&'*+/=?\\^_`{|}~-]+(?:\\.[\\p{L}0-9!#$%\\&'*+/=?\\^_`{|}" + "~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\" + "x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[\\p{L}0-9](?:[a-" + "z0-9-]*[\\p{L}0-9])?\\.)+[\\p{L}0-9](?:[\\p{L}0-9-]*[\\p{L}0-9])?|\\[(?:(?:25[0-5" + "]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-" + "9][0-9]?|[\\p{L}0-9-]*[\\p{L}0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21" + "-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
        //let emailFormat = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPredicate = NSPredicate(format:"SELF MATCHES %@", emailFormat)
        return emailPredicate.evaluate(with: string)
    }
}




struct FirstResponderEmailTextField: UIViewRepresentable {
    @Binding var text: String
    let placeholder: String
    
    class Coordinator: NSObject, UITextFieldDelegate {
        @Binding var text: String
        var becameFirstResponder = false
        init(text: Binding<String>){
            self._text = text
        }
        
        func textFieldDidChangeSelection(_ textField: UITextField) {
            text = textField.text ?? ""
        }
    }
    
    func makeCoordinator() -> Coordinator {
        return Coordinator(text: $text)
    }
    
    func makeUIView(context: Context) -> some UIView {
        let textField = UITextField()
        textField.delegate = context.coordinator
        textField.placeholder = placeholder
        return textField
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {
        if !context.coordinator.becameFirstResponder{
            uiView.becomeFirstResponder()
            context.coordinator.becameFirstResponder = true
        }
        
    
}
    
}






struct SignInView_Previews: PreviewProvider {
    static var previews: some View {
        SignInView()
    }
}


