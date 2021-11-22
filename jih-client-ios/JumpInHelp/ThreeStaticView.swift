//
//  ThreeStaticView.swift
//  ThreeStaticView
//
//  Created by Juan Chipoco on 13/08/21.
//

import SwiftUI

struct ThreeStaticView: View {
    
    
    
    var body: some View {
        VStack {
            Image("conversation").resizable().frame(width: 400, height: 250, alignment: .center).background(Color.white)
            
            Text("Jump In Help")
                .font(.headline)
            
            Text("All you need to do is press the button and follow the steps to have your personal cyber-security expert join your call")
                .font(.caption)
                .multilineTextAlignment(.center)
                .padding()
            
            
       
             
            NavigationLink(destination: SignScreenView(), label:{
                Text("Next")
            })
            
            Spacer()
        }
    }
}

struct ThreeStaticView_Previews: PreviewProvider {
    static var previews: some View {
        ThreeStaticView()
            
    }
}
