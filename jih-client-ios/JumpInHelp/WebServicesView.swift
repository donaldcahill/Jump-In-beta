//
//  WebServicesView.swift
//  WebServicesView
//
//  Created by Juan Chipoco on 15/08/21.
//

import SwiftUI
import Combine

struct Post: Codable, Identifiable {
    var id = UUID()
    
    var title : String
    var body : String
}

class Api{
    func getPosts(completion: @escaping([Post]) -> ()) {
        guard let url = URL(string: "http://jhiapi-env.eba-fgbsqpq7.us-east-2.elasticbeanstalk.com/operator/list-countries") else {return}
        
        URLSession.shared.dataTask(with: url) { (data, _, _)  in
            let posts = try! JSONDecoder().decode([Post].self, from: data!)
            print(posts)
            DispatchQueue.main.async {
                completion(posts)
            }
            
        }
        .resume()
        
    }
    
    func getPosts1() {
        guard let url = URL(string: "http://jhiapi-env.eba-fgbsqpq7.us-east-2.elasticbeanstalk.com/operator/list-countries") else {return}
        
        URLSession.shared.dataTask(with: url) { (data, _, _)  in
            let posts = try! JSONDecoder().decode([Post].self, from: data!)
            print(posts)
            
        }
        .resume()
        
    }
}

