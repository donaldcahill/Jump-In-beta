//
//  PostList.swift
//  PostList
//
//  Created by Juan Chipoco on 15/08/21.
//

import SwiftUI

struct PostList: View {
    @State var posts: [Post] =  []
    var body: some View {
        
        /*List(posts){
            post in Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
        }.onAppear{
            Api().getPosts {  (posts) in
                self.posts = posts
            }
        }*/
        Text("Hello")
            .onAppear{
                Api().getPosts1()
            }
    }
}

struct PostList_Previews: PreviewProvider {
    static var previews: some View {
        PostList()
    }
}
