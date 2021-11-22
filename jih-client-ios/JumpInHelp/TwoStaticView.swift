//
//  TwoStaticView.swift
//  TwoStaticView
//
//  Created by Juan Chipoco on 13/08/21.
//

import SwiftUI

struct TwoStaticView: View {
    var body: some View {
        VStack {
            Image("consulta").resizable().frame(width: 400, height: 250, alignment: .center).background(Color.white)
                .padding()
            
            Text("Jump In Help")
                .font(.headline)
            
            Text("After registering and choosing your plan you will have installed our floating help button that will appear during your phone calls")
                
                .font(.caption2)
                .multilineTextAlignment(.center)
                .padding()
            
            NavigationLink(destination: ThreeStaticView(), label:{
                Text("Next")
            })
            
            Spacer()
        }
    }
}

struct TwoStaticView_Previews: PreviewProvider {
    static var previews: some View {
        TwoStaticView()
    }
}
