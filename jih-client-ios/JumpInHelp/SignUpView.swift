//
//  SignUpView.swift
//  SignUpView
//
//  Created by Juan Chipoco on 15/08/21.
//

import SwiftUI
import Combine
import iPaymentButton

//Model

/*struct Response: Codable {
    
    var results: [Country]
   
}*/

struct Country: Decodable {
    let idCountry: String
    let nameCountry: String
    let callingCode: String
    let alphaCode_2: String
    let alphaCode_3: String
    let registerDate: String
    let state: Int
}

struct Language: Decodable, Hashable {
    let idLanguage: String
    let abreviation: String
    let description: String
    let state: Int
}

struct Payment: Decodable {
    let idPayOption: String
    let amount: String
    let description: String
    let state: Int
}

struct Operator: Decodable {
    let idOperator: String
    let idCountry: String
    let name: String
    let pass: String
    let phoneNumber: String
    let email: String
    let date: String
    let state: String
    
}

struct OperatorParent: Decodable {
    var operators: [Operator]
    let state: Bool
    let message: String
    
}


struct Login: Decodable {
    let statusCode: String
    let message: String
    
}

struct CreateUser: Decodable {
    let idUser: String
    let idPayOption: String
    let idLanguage: String
    let idCountry: String
    let name: String
    let phone: String
    let email: String
    let pass: String
    let registrationDate: String
    let state: Bool
    
}



struct SignUpView: View {
    
    @State var idUser = ""
    @State var idPayOption = ""
    @State var idLanguage = ""
    @State var idCountry = ""
    @State var name = ""
    @State var phone = ""
    @State var email = ""
    @State var pass = ""
    @State var registrationDate = ""
    @State var state = false
    
    @State var country = ""
    @State var rsp = -1
    
    @ObservedObject var  register = Register()
    
    @State private var selectedCountry: String = ""
    @State private var selectedLanguage: String = ""
    @State private var selectedPayment: String = ""
    
    @FocusState private var emailIsFocused: Bool
    @FocusState private var passIsFocused: Bool
    @FocusState private var countryIsFocused: Bool
    @FocusState private var languageIsFocused: Bool
    
    @State private var isEmailValid : Bool   = false
    
    @State var expand = false
    @State var expandLanguage = false
    @State var expandPayment = false
    
    @State private var showAlert = false
    
    @State private var showingNameAlert = false
    @State private var showingPhoneAlert = false
    @State private var showingEmailAlert = false
    @State private var showingPasswordAlert = false
    @State private var showingCountryAlert = false
    @State private var showingLanguageAlert = false
    @State private var showingPaymentAlert = false
    
    @State private var showingSuccessMessage = false
    @State private var showingFailMessage = false
    
    @State private var firstToggleDisable = false
    @State private var secondToggleDisable = false
    
    
    @State private var selectedUnit: Int = 0
    
    @State private var activateLink = false
    @State var showDetail: Bool = false
    
    @State var isNavigationBarHidden: Bool = true
    @State var selectedIndex: Int? = nil
    
    @State var showCountrySelect: Bool = true
    @State var showLanguageSelect: Bool = true
    
    @State private var isLoading = false
    
    var body: some View {
        
        
        NavigationLink(destination: SuccessView(), isActive: self.$showDetail) { EmptyView() }
        
        NavigationView
        {
            ScrollView
            {
                VStack
                {
                    Image("banner").resizable()
                        .aspectRatio(contentMode: .fit).background(Color.white)
                    
                    //Spinner
                    if isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .orange))
                            .scaleEffect(3)
                        
                    }
                    
                    VStack
                    {
                        
                        VStack{
                            
                            VStack{
                                Text("Sign Up")
                                    .foregroundColor(Color.blue)
                                    .font(.system(size: 20))
                                    .multilineTextAlignment(.leading)
                                    .padding()
                               
                                
                            }
                            .padding(.top, 0) //For top curve
                            
                            HStack (spacing: 15){
                                Image(systemName: "person.fill")
                                    .foregroundColor(Color.blue)
                                
                                TextField("Enter Your Full Name", text: $register.name)
                                
                            }
                            Divider().background(Color.white.opacity(0.5))
                        }
                        .accentColor(.black)
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        VStack{
                            HStack (spacing: 15){
                                Image(systemName: "phone.fill")
                                    .foregroundColor(Color.blue)
                                
                                TextField("Enter Your Phone", text: $register.phone)
                                    .keyboardType(.numberPad)
                                                .onReceive(Just(register.phone)) { newValue in
                                                    let filtered = newValue.filter { "0123456789".contains($0) }
                                                    if filtered != newValue {
                                                        self.register.phone = filtered
                                                    }
                                                }
                            }
                            Divider().background(Color.white.opacity(0.5))
                        }
                        .accentColor(.black)
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        VStack{
                            HStack (spacing: 15){
                                Image(systemName: "envelope.fill")
                                    .foregroundColor(Color.blue)
                                
                                TextField("Enter your Email", text: $register.email, onEditingChanged: { (isChanged) in
                                    if !isChanged {
                                        if self.textFieldValidatorEmail(self.register.email) {
                                            self.isEmailValid = true
                                        } else {
                                            self.isEmailValid = false
                                            self.register.email = ""
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
                                //.padding()
                                
                                if !self.isEmailValid {
                                    Text("Email is Not Valid")
                                        .font(.callout)
                                        .foregroundColor(Color.red)
                                    
                                }
                                
                            }
                            
                            
                            Divider().background(Color.white.opacity(0.5))
                        }
                        .accentColor(.black)
                        
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        VStack{
                            HStack (spacing: 15){
                                Image(systemName: "lock.fill")
                                    .foregroundColor(Color.blue)
                                
                                SecureField("Enter your Password", text: $register.pass)
                                
                            }
                            Divider().background(Color.white.opacity(0.5))
                        }
                        .accentColor(.black)
                        .focused($passIsFocused)
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        
                        /*******************************************/
                        
                        
                        VStack{
                            HStack (spacing: 15){
                                Image(systemName: "house.fill")
                                    .foregroundColor(Color.blue)
                                
                                Text("Country").foregroundColor(Color.gray.opacity(0.5))
                                Spacer()
                                
                            }
                            
                        }
                        .accentColor(.black)
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        
                        VStack {
                                Button(action: {
                                    self.expand.toggle()
                                    passIsFocused = false
                                    showCountrySelect = false
                                    
                                }) {
                                    HStack{
                                        if showCountrySelect {
                                            Text("Select Country:").foregroundColor(Color.gray)
                                        }
                                    
                                        Text(selectedCountry).foregroundColor(Color.gray)
                                        /*TextField("Select Country", text: $selectedCountry, onEditingChanged: { (changed) in
                                            if changed {
                                                //TextField("Select Country", text: self.$selectedCountry)
                                                
                                            }
                                        }
                                        ).foregroundColor(Color.gray.opacity(0.5)).textFieldStyle(.roundedBorder)
                                        .focused($countryIsFocused)*/
                                    }
                                }.padding(.top, 0)
                        
                                
                            
                                if expand {
                                    
                                    Picker(
                                        selection: $selectedCountry,
                                     
                                        label: Text("Picker"),
                                       

                                        content:{
                                            ForEach(register.countries, id: \.nameCountry) {item in
                                                Text(item.nameCountry)
                                            }
                                        }
                                    ).labelsHidden()
                                    .background(Color.white)
                                    .pickerStyle(WheelPickerStyle())
                                    .overlay(
                                        GeometryReader { gp in
                                            VStack {
                                                Button(action: {
                                                    self.expand.toggle()
                                                    countryIsFocused = false
                                                }) {
                                                    Text("Done")
                                                        .font(.system(size: 20))
                                                        .foregroundColor(.blue).opacity(0.8)
                                                        .padding(.vertical)
                                                        .frame(width: gp.size.width)
                                                        
                                                        
                                                }.background(Color.white)
                                                Spacer()
                                            }
                                            .frame(width: gp.size.width, height: gp.size.height - 12)
                                            //.border(Color.black, width: 1)
                                        }
                                    )
                                    
                                    
                                    
                                }
                                
                        }.onAppear(perform: {
                            register.loadCountry()
                        })
                        
                        /*******************************************/
                                                    
                        VStack{
                            HStack (spacing: 15){
                                Image(systemName: "message.fill")
                                    .foregroundColor(Color.blue)
                                
                                Text("Language").foregroundColor(Color.gray.opacity(0.5))
                            Spacer()
                                
                            }
                            
                        }
                        .padding(.horizontal)
                        .padding(.top, 10)
                        
                        VStack
                        {
                                Button(action: {
                                    self.expandLanguage.toggle()
                                    passIsFocused = false
                                    showLanguageSelect = false
                                })
                                {
                                    HStack{
                                        if showLanguageSelect {
                                            Text("Select Language").foregroundColor(Color.gray)
                                        }
                                        Text(selectedLanguage).foregroundColor(Color.gray)
                                        /*TextField("Select Language", text: self.$selectedLanguage, onEditingChanged: { (changed) in
                                            if changed {
                                                print("Selected Language: ",$selectedLanguage)
                                                //TextField("Select Language", text: self.$selectedLanguage)
                                            }
                                        }
                                        ).foregroundColor(Color.gray.opacity(0.5)).textFieldStyle(.roundedBorder)
                                        .focused($languageIsFocused)*/
                                    }
                                }.padding(.top, 0)
                        
                                if expandLanguage {
                                    
                                    
                                    Picker(
                                        selection: $selectedLanguage,
                                        label: Text("Picker: "),
                                        
                                        content:{
                                            ForEach(register.langs, id: \.description) {item in
                                                Text(item.description)
                                               
                                            }
                                        }
                                    ).labelsHidden()
                                    .background(Color.white)
                                    .pickerStyle(WheelPickerStyle())
                                    .overlay(
                                        GeometryReader { gp in
                                            VStack {
                                                Button(action: {
                                                    self.expandLanguage.toggle()
                                                    languageIsFocused = false
                                                }) {
                                                    Text("Done")
                                                        .font(.system(size: 20))
                                                        .foregroundColor(.blue).opacity(0.8)
                                                        .padding(.vertical)
                                                        .frame(width: gp.size.width)
                                                        
                                                }.background(Color.white)
                                                Spacer()
                                            }
                                            .frame(width: gp.size.width, height: gp.size.height - 12)
                                            //.border(Color.black, width: 1)
                                        }
                                    )
                                    
                                }
                        }.onAppear(perform: {
                            register.loadLanguage()
                        })

                        VStack
                        {
                                                        
                                                        
                            ForEach(register.pays, id: \.description) {item in
                                if item.idPayOption == "1"
                                {
                                    Toggle(isOn: $register.isFirstPaymentOn) {
                                        
                                        if(register.isFirstPaymentOn){
                                            Text(item.description).foregroundColor(Color.blue).font(.system(size: 12))
                                            
                                        }
                                        else{
                                            Text(item.description).foregroundColor(Color.gray).font(.system(size: 12))
                                          
                                        }
                                    }
                                    .onChange(of: register.isFirstPaymentOn, perform: { value in
                                        // Perform further actions on toggle's value change!
                                        if(register.isFirstPaymentOn){
                                            register.isSecondPaymentOn = false
                                        }
                                        if(!register.isFirstPaymentOn){
                                            register.isSecondPaymentOn = true
                                        }
                                        /*else{
                                            secondToggleDisable = false
                                        }*/
                                    })
                                    .toggleStyle(SwitchToggleStyle(tint: .blue))
                                    .disabled(firstToggleDisable)
                                   
                                }
                                else if item.idPayOption == "2"
                                {
                                    Toggle(isOn: $register.isSecondPaymentOn)
                                    {
                                        if(register.isSecondPaymentOn){
                                            Text(item.description).foregroundColor(Color.blue).font(.system(size: 12))
                                       
                                        }
                                        else{
                                            Text(item.description).foregroundColor(Color.gray).font(.system(size: 12))
                                         
                                        }
                                    }
                                    .onChange(of: register.isSecondPaymentOn, perform: { value in
                                        // Perform further actions on toggle's value change!
                                        if(register.isSecondPaymentOn){
                                            register.isFirstPaymentOn = false
                                        }
                                        if(!register.isSecondPaymentOn){
                                            register.isFirstPaymentOn = true
                                        }
                                        /*else{
                                            firstToggleDisable = false
                                        }*/
                                    })
                                    .toggleStyle(SwitchToggleStyle(tint: .blue))
                                    .disabled(secondToggleDisable)
                                }
                                
                            }
                    
                        }.onAppear(perform: {
                            register.loadPayment()
                        })
                        .padding()
                        .padding(.bottom, 5)
                        .background(Color.white)
                        .padding(.horizontal, 20)
                                            
                        
                        
                        
                        
                        Button(action: {
                            
                            isLoading = true
                                                    
                            print("Name: ", self.register.name)
                            print("Phone: ", self.register.phone)
                            print("Email: ", self.register.email)
                            print("Pass: ", self.register.pass)
                            
                            for item in register.countries {
                                if(item.nameCountry == $selectedCountry.wrappedValue){
                                    idCountry = item.idCountry
                                }
                                
                            }
                            
                            for item in register.langs {
                                if(item.description == $selectedLanguage.wrappedValue){
                                    idLanguage = item.idLanguage
                                }
                                
                            }
                            
                            print("Country: ", idCountry)
                            print("Language: ", idLanguage)
                            
                            idUser = ""
                            //idPayOption = register.payment
                           
                            name = register.name
                            phone = register.phone
                            email = register.email
                            pass = register.pass
                            registrationDate = "2021-11-02 14:00:00"
                            state = true
                            
                            if self.register.isFirstPaymentOn
                            {
                                self.register.payment = "1"
                                idPayOption = "1"
                            }
                            
                            if self.register.isSecondPaymentOn
                            {
                                self.register.payment = "2"
                                idPayOption = "2"
                            }
                            
                            print("Payment: ", idPayOption)
                            print("isEmailValid: ", isEmailValid)
                           
                            
                            emailIsFocused = false
                            passIsFocused = false
                            
                            showingNameAlert = false
                            showingPhoneAlert = false
                            showingEmailAlert = false
                            showingPasswordAlert = false
                            showingCountryAlert = false
                            showingLanguageAlert = false
                            
                            if(register.name == ""){
                                print("NAME not valid")
                                showAlert = true
                                showingNameAlert = true
                                return
                            }
                            else{
                                showAlert = false
                                showingNameAlert = false
                            }
                            
                            if(register.phone == ""){
                                print("PHONE not valid")
                                showAlert = true
                                showingPhoneAlert = true
                                return
                            }
                            else{
                                showAlert = false
                                showingPhoneAlert = false
                            }
                            
                            if(register.email == "" || !self.isEmailValid ){
                                print("email not valid...")
                                showAlert = true
                                showingEmailAlert = true
                                return
                            }
                            else{
                                showAlert = false
                                showingEmailAlert = false
                            }
                            
                            if(register.pass == ""){
                                print("password not valid")
                                showAlert = true
                                showingPasswordAlert = true
                                return
                            }
                            else{
                                showAlert = false
                                showingPasswordAlert = false
                            }
                            
                            if(idCountry == ""){
                                print("country not valid")
                                showAlert = true
                                showingCountryAlert = true
                                return
                            }
                            else{
                                showAlert = false
                                showingCountryAlert = false
                            }
                            
                            if(idLanguage == ""){
                                print("language not valid")
                                showAlert = true
                                showingLanguageAlert = true
                                return
                            }
                            else{
                                showAlert = false
                                showingLanguageAlert = false
                            }
                            
                            if(idPayOption == ""){
                                print("payment not valid")
                                showAlert = true
                                showingPaymentAlert = true
                                return
                            }
                            else{
                                showAlert = false
                                showingPaymentAlert = false
                            }
                            
                            print("CALLING WEB API")
                            
                            startFakeNetworkCall()
                            
                            register.postCreateUser(iduser: idUser, payoption: idPayOption, language: idLanguage, country: idCountry, name: name, phone: phone, email: email, pass: pass, regdate: registrationDate, state: true) { statusCode in
                              
                                // do something with the returned Bool
                                print("RESPONSE: ",statusCode)
                                print("BACK FROM WEB API")
                                
                                isLoading = false
                                
                                if statusCode == 200 || statusCode == 201 {
                                    showAlert = true
                                    showingSuccessMessage = true
                                    showingFailMessage = false
                                }
                                else {
                                    showAlert = true
                                    showingFailMessage = true
                                    showingSuccessMessage = false
                                }
                                
                                
                                print("AFTER CALLING WEB API")
                                
                                DispatchQueue.main.async {
                                   // update UI
                                }
                            }
                            
                            
                           
                            
                        }){
                            HStack {
                                Spacer()
                                Text("Sign Up").foregroundColor(Color.white).bold()
                                Spacer()
                            }
                            .frame(width: 80, height: 15, alignment: .center)
                            .foregroundColor(.white)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(8)
                            .shadow(radius: 10)
                            .offset(x: 0)
                        
                        }
                        
                    }
                    
                    //APPLE PAY
                    /*VStack{
                        iPaymentButton  {
                            iPaymentButton.applePayDemo()
                        }
                        .padding()
                    }*/
                    
                    
                    Spacer()
                }.background(Color.white.ignoresSafeArea(.all))
                .edgesIgnoringSafeArea(.all)
                .padding(0)
                .alert(isPresented: $showAlert) {
                    print(self.showingEmailAlert)
                    print(self.showingPasswordAlert)
                    if self.showingEmailAlert {
                        //showingEmailAlert = false
                        return Alert(title: Text("Important message"), message: Text("Enter your email"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingNameAlert {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Enter your full name"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingPhoneAlert {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Enter your phone number"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingPasswordAlert {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Enter your password"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingCountryAlert {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Select a country"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingLanguageAlert {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Select a language"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingPaymentAlert {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Select a payment option"), dismissButton: .default(Text("Got it!")))
                    }
                    else if self.showingSuccessMessage {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Success: User " + register.name  + " has been created succcesfully"), dismissButton: .default(Text("Got it!")) {
                            print("Ok Click")
                            self.showDetail = true
                        })
                    }
                    else if self.showingFailMessage {
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Error: " + register.name  + " wasn't created successfully"), dismissButton: .default(Text("Got it!")))
                    }
                    else{
                        //showingEmailAlert = false
                        //showingPasswordAlert = false
                        return Alert(title: Text("Important message"), message: Text("Enter your password-"), dismissButton: .default(Text("Got it!")))
                        
                    }
                }
            }
            
            .navigationBarHidden(self.isNavigationBarHidden)
                
        }.navigationBarTitle("", displayMode: .inline)
        .navigationBarColor(backgroundColor: Color.init(red: 8.0/255.0, green: 14.0/255.0, blue: 38.0/255.0), titleColor: .black)
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

struct NavigationBarModifier: ViewModifier {

    var backgroundColor: UIColor?
    var titleColor: UIColor?
    

    init(backgroundColor: Color, titleColor: UIColor?) {
        self.backgroundColor = UIColor(backgroundColor)
        
        let coloredAppearance = UINavigationBarAppearance()
        coloredAppearance.configureWithTransparentBackground()
        coloredAppearance.backgroundColor = .clear // The key is here. Change the actual bar to clear.
        coloredAppearance.titleTextAttributes = [.foregroundColor: titleColor ?? .white]
        coloredAppearance.largeTitleTextAttributes = [.foregroundColor: titleColor ?? .white]
        coloredAppearance.shadowColor = .clear
        
        UINavigationBar.appearance().standardAppearance = coloredAppearance
        UINavigationBar.appearance().compactAppearance = coloredAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = coloredAppearance
        UINavigationBar.appearance().tintColor = titleColor
    }

    func body(content: Content) -> some View {
        ZStack{
            content
            VStack {
                GeometryReader { geometry in
                    Color(self.backgroundColor ?? .clear)
                        .frame(height: geometry.safeAreaInsets.top)
                        .edgesIgnoringSafeArea(.top)
                    Spacer()
                }
            }
        }
    }
}

extension View {
    func navigationBarColor(backgroundColor: Color, titleColor: UIColor?) -> some View {
        self.modifier(NavigationBarModifier(backgroundColor: backgroundColor, titleColor: titleColor))
    }
}

struct TestNavigationFromAlert_Previews: PreviewProvider {
    static var previews: some View {
        SignUpView()
    }
}


struct FirstResponderTextField: UIViewRepresentable {
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

struct SignUpView_Previews: PreviewProvider {
    static var previews: some View {
        SignUpView(register: Register())
    }
}
