//
//  Register.swift
//  Register
//
//  Created by Juan Chipoco on 30/08/21.
//

import Foundation

class Register: ObservableObject {
    
    
    @Published var countries = [Country]()
    @Published var langs = [Language]()
    @Published var pays = [Payment]()
    @Published var operators = [OperatorParent]()
    
    @Published var createUser = [CreateUser]()
    @Published var login = [Login]()
    
    @Published var createUserRsp = ""
    @Published var loginUserRsp = ""
    
    
    @Published var name = ""
    @Published var phone = ""
    @Published var email = ""
    @Published var pass = ""
    
    @Published var country = ""
    @Published var language = ""
    @Published var payment = ""
    
    
    @Published var count: Int = 0
    
    @Published var isPaymentEnabled: Bool = false
    
    @Published var isFirstPaymentOn: Bool = true
    @Published var isSecondPaymentOn: Bool = false
    
    @Published var isFirstSwitch: Bool = false
    @Published var isSecondSwitch: Bool = false
    
    @Published var paymentDescription: String = ""
    
    @Published private var showAlert = false
    
    
    @Published private var serviceResponse = -1
    
    
    let userDefaults = UserDefaults()
    
   
    func loadCountry(){
        let api = "https://www.jih-service.com:4050/operator/list-countries"
        guard let url = URL(string: api) else {
            print("Invalid Result")
            return
        }
        
        let request = URLRequest(url: url)
        
        URLSession.shared.dataTask(with: request){ (data, response, error) in
            if let data = data {
                if let decodedReponse = try? JSONDecoder().decode([Country].self, from: data){
                
                    DispatchQueue.main.async {
                        self.countries = decodedReponse
                    }
                    
                    return
                }
                    
            }
            else {
                print("Fetch Failed: \(error?.localizedDescription ?? "Unknown Error")")
            }
        }.resume()
    }
    
    func loadLanguage(){
        let api = "https://www.jih-service.com:4050/operator/list-languages"
        guard let url = URL(string: api) else {
            print("Invalid Result")
            return
        }
        
        let request = URLRequest(url: url)
        
        URLSession.shared.dataTask(with: request){ (data, response, error) in
            if let data = data {
                if let decodedReponse = try? JSONDecoder().decode([Language].self, from: data){
                
                    DispatchQueue.main.async {
                        self.langs = decodedReponse
                    }
                    
                    return
                }
                    
            }
            else {
                print("Fetch Failed: \(error?.localizedDescription ?? "Unknown Error")")
            }
        }.resume()
    }
    
    func loadPayment(){
        
        
        let api = "https://www.jih-service.com:4050/operator/list-pay-options"
        guard let url = URL(string: api) else {
            print("Invalid Result")
            return
        }
        
        let request = URLRequest(url: url)
        
        URLSession.shared.dataTask(with: request){ (data, response, error) in
            if let data = data {
                if let decodedReponse = try? JSONDecoder().decode([Payment].self, from: data){
                
                    DispatchQueue.main.async {
                        self.pays = decodedReponse
                    }
                    
                    return
                }
                    
            }
            else {
                print("Fetch Failed: \(error?.localizedDescription ?? "Unknown Error")")
            }
        }.resume()
    }
    
    func postCreateUser(iduser: String, payoption: String, language: String, country: String, name: String, phone: String, email: String, pass: String, regdate: String, state: Bool, completion: @escaping (Int)->()) {
       
        let api = "https://www.jih-service.com:4050/user/create-user"
        guard let url = URL(string: api) else {
            print("Invalid Result")
            return
        }
        
        print("API ", api)
        
        print("idUser","")
        print("idPayOption",payoption)
        print("idLanguage",language)
        print("idCountry",country)
        print("name",name)
        print("phone",phone)
        print("email",email)
        print("pass",pass)
        print("registrationDate",regdate)
        print("state", state)
        
        
        var request = URLRequest(url: url)
        
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type") // the request is JSON
        request.setValue("application/json", forHTTPHeaderField: "Accept") // the response expected to be in JSON format
        
        
        
        let body:[String: AnyHashable] = [
            "idUser": "",
            "idPayOption": "1",
            "idLanguage": language,
            "idCountry": country,
            "name": "jchipoco",
            "phone": phone,
            "email": email,
            "pass": pass,
            "registrationDate": regdate,
            "state": true
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: .fragmentsAllowed)
        
        print("BODY ", request.httpBody)
        
        
            let task =  URLSession.shared.dataTask(with: request) { data, response, error in
                
                if error == nil, let data = data, let response = response as? HTTPURLResponse {
                    print("Content-Type: \(response.allHeaderFields["Content-Type"] ?? "")")
                    print("statusCode: \(response.statusCode)")
                    print("Data: \(data)")
                  
                  
                    print("POST RSP: ", String(data: data, encoding: .utf8) ?? "")
                    print("POST RSP: ", String(data: data, encoding: .utf8) ?? "")
                    
                    if response.statusCode == 200 || response.statusCode == 201 {
                        print("User was created successfully")
                        completion(response.statusCode)
                        
                    }
                    else{
                        print("Error creating user")
                        completion(response.statusCode)
                    }
                   
                } else {
                    print("404")
                    completion(404)
                }
                
                guard error == nil else {
                    print("Error: error calling POST")
                    
                    print(error!)
                    completion(500)
                    return
                }
                
                guard let data = data else {
                    print("Error: Did not receive data")
                
                    completion(500)
                    return
                }
                
                guard let response = response as? HTTPURLResponse, (200 ..< 299) ~= response.statusCode else {
                    print("Error: HTTP request failed")
                    
                    completion(500)
                    return
                }
                do {
                    guard let jsonObject = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                        print("Error: Cannot convert data to JSON object")
                        print(response)
                        completion(500)
                        return
                    }
                    guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                        print("Error: Cannot convert JSON object to Pretty JSON data")
                  
                        completion(500)
                        return
                    }
                    guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                        print("Error: Couldn't print JSON in String")
                   
                        completion(500)
                        return
                    }
                    
                    let json = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String:Any]
                    print("JSON: ", json)
          
                    print("id_user", json?["idUser"])
                    print("id_password", json?["pass"])
                    print("id_language", json?["idLanguage"])
                    print("email", json?["email"])
                    
                    self.userDefaults.setValue(json?["idUser"], forKey: "user")
                    self.userDefaults.setValue(json?["pass"], forKey: "password")
                    self.userDefaults.setValue(json?["idLanguage"], forKey: "language")
                    self.userDefaults.setValue(json?["email"], forKey: "email")
                    
                } catch {
                    print("Error: Trying to convert JSON data to string")
                    completion(500)
                    return
                }
                
            }.resume()
        
        print("Returning: ", self.serviceResponse)
       
    }
    
    func postLoginUser(username: String, password:String, completion: @escaping (Int)->()){
       
        let api = "https://www.jih-service.com:4050/user/login-user"
        guard let url = URL(string: api) else {
            print("Invalid Result")
            return
        }
        
        
        var request = URLRequest(url: url)
        
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type") // the request is JSON
        request.setValue("application/json", forHTTPHeaderField: "Accept") // the response expected to be in JSON format
        
        
        
        let body:[String: AnyHashable] = [
            "user": username,
            "pass": password
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: .fragmentsAllowed)
        
        print("BODY ", request.httpBody)
        
        
        let task =  URLSession.shared.dataTask(with: request) { data, response, error in
            
            if error == nil, let data = data, let response = response as? HTTPURLResponse {
                print("Content-Type: \(response.allHeaderFields["Content-Type"] ?? "")")
                print("statusCode: \(response.statusCode)")
                print("Data: \(data)")
              
              
                print("POST RSP: ", String(data: data, encoding: .utf8) ?? "")
                print("POST RSP: ", String(data: data, encoding: .utf8) ?? "")
                
                let json = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String:Any]
                print("JSON: ", json)
                print("STATUS CODE: ", response.statusCode)
                
                //if json?["statusCode"] as! Int == 500  {
                if response.statusCode == 500 {
                    print("message", json?["message"])
                    print("statusCode", json?["statusCode"])
                    completion(0)
                    return
                }
                else {
      
                    print("message", json?["email"])
                    print("status", json?["state"])
                    
                    if json?["state"] as! Int == 1 {
                        print("User logged successfully")
                        
                        print("id_user", json?["idUser"])
                        print("id_password", json?["pass"])
                        print("id_language", json?["idLanguage"])
                        print("email", json?["email"])
                        
                        self.userDefaults.setValue(json?["idUser"], forKey: "user")
                        self.userDefaults.setValue(json?["pass"], forKey: "password")
                        self.userDefaults.setValue(json?["idLanguage"], forKey: "language")
                        self.userDefaults.setValue(json?["email"], forKey: "email")
                        
                        
                        
                        completion(json?["state"] as! Int)
                        
                    }
                    else{
                        print("Error logging user")
                        completion(json?["state"] as! Int)
                    }
                }
            } else {
                print("404")
                completion(404)
            }
            
            guard error == nil else {
                print("Error: error calling POST")
                
                print(error!)
                completion(500)
                return
            }
            
            guard let data = data else {
                print("Error: Did not receive data")
            
                completion(500)
                return
            }
            
            guard let response = response as? HTTPURLResponse, (200 ..< 299) ~= response.statusCode else {
                print("Error: HTTP request failed")
                
                completion(500)
                return
            }
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    print(response)
                    completion(500)
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
              
                    completion(500)
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Couldn't print JSON in String")
               
                    completion(500)
                    return
                }
                
                let json = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String:Any]
                print("JSON: ", json)
      
                print("statusCode", json?["state"])
                print("message", json?["email"])
                
                
                /*self.userDefaults.setValue(json?["idUser"], forKey: "user")
                self.userDefaults.setValue(json?["pass"], forKey: "password")
                self.userDefaults.setValue(json?["idLanguage"], forKey: "language")
                self.userDefaults.setValue(json?["email"], forKey: "email")*/
                
            } catch {
                print("Error: Trying to convert JSON data to string")
                completion(500)
                return
            }
            
        }.resume()
    }
    
    func loadOperators(language: String, completion: @escaping (Int)->()){
        print("loadOperators language:  ", language)
        let api = "https://www.jih-service.com:4050/operator/operator-by-language/" + language
        print("API:", api)
        
        guard let url = URL(string: api) else {
            print("Invalid Result")
            return
        }
        
        var request = URLRequest(url: url)
        
        URLSession.shared.dataTask(with: request){ (data, response, error) in
            
            if error == nil, let data = data, let response = response as? HTTPURLResponse {
                print("Content-Type: \(response.allHeaderFields["Content-Type"] ?? "")")
                print("statusCode: \(response.statusCode)")
                print("Data: \(data)")
              
                /*let decodedReponse = try? JSONDecoder().decode([OperatorParent].self, from: data)
                
                    print("DR: ", decodedReponse)
                    
                    print("2")
                    
                    
                */
              
                print("POST RSP: ", String(data: data, encoding: .utf8) ?? "")
                print("POST RSP: ", String(data: data, encoding: .utf8) ?? "")
                
                let json = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String:Any]
                print("JSON: ", json)
                print("STATUS CODE: ", response.statusCode)
                
                if response.statusCode == 200 || response.statusCode == 201 {
                    
                    
                  
                    if json?["state"] as! Int == 1 {
                        print("Operator was loaded")
                        
                        
                        
                        
                        
                        
                        completion(json?["state"]  as! Int)
                    }
                    else{
                        
                        print("message", json?["message"])
                        print("state", json?["state"])
                        print("operator", json?["operator"])
                        
                        print("Error getting operator")
                        completion(json?["state"]  as! Int)
                    }
                }
                else{
                    print("Error setting operator")
                    completion(response.statusCode)
                }
               
            } else {
                print("404")
                completion(404)
            }
            
            
            
        }.resume()
    }
    
    func postValidateUser(userid: String, email:String, completion: @escaping (Int)->()){
       
        let api = "https://www.jih-service.com:4050/user/user-validate"
        guard let url = URL(string: api) else {
            print("Invalid Result")
            return
        }
        
        
        var request = URLRequest(url: url)
        
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type") // the request is JSON
        request.setValue("application/json", forHTTPHeaderField: "Accept") // the response expected to be in JSON format
        
        
        
        let body:[String: AnyHashable] = [
            "idUser": userid,
            "user": email
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: .fragmentsAllowed)
        
        print("BODY ", request.httpBody)
        
        
        let task =  URLSession.shared.dataTask(with: request) { data, response, error in
            
            if error == nil, let data = data, let response = response as? HTTPURLResponse {
                print("Content-Type: \(response.allHeaderFields["Content-Type"] ?? "")")
                print("statusCode: \(response.statusCode)")
                print("Data: \(data)")
              
                print("POST RSP: ", String(data: data, encoding: .utf8) ?? "")
                
                let json = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String:Any]
                print("JSON: ", json)
      
                print("message", json?["message"])
                print("state", json?["state"])
                
                if response.statusCode == 200 || response.statusCode == 201 {
                
                    print(json?["message"])
                    completion(json?["state"] as! Int)
                    
                }
                else{
                    print(json?["message"])
                    completion(json?["state"] as! Int)
                }
               
            } else {
                print("404")
                completion(404)
            }
            
            guard error == nil else {
                print("Error: error calling POST")
                
                print(error!)
                completion(500)
                return
            }
            
            guard let data = data else {
                print("Error: Did not receive data")
            
                completion(500)
                return
            }
            
            guard let response = response as? HTTPURLResponse, (200 ..< 299) ~= response.statusCode else {
                print("Error: HTTP request failed")
                
                completion(500)
                return
            }
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                    print("Error: Cannot convert data to JSON object")
                    print(response)
                    completion(500)
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
              
                    completion(500)
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Couldn't print JSON in String")
               
                    completion(500)
                    return
                }
                
                let json = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String:Any]
                print("JSON: ", json)
      
                //print("state", json?["state"])
                //print("message", json?["message"])
                
                
                
                
            } catch {
                print("Error: Trying to convert JSON data to string")
                completion(500)
                return
            }
            
        }.resume()
    }
    
    
}
