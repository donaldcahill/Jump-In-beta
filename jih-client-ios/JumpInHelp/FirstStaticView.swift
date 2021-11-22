//
//  FirstStaticView.swift
//  FirstStaticView
//
//  Created by Juan Chipoco on 13/08/21.
//

import SwiftUI

struct FirstStaticView: View {
    var body: some View {
       
            VStack {
                
            
                
                GeometryReader { geo in
                    Image("customer")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: geo.size.width, height: 400, alignment: .center).background(Color.white)
                    
                //Spacer()
                }
            }
            
    
    }
}

struct FirstStaticView_Previews: PreviewProvider {
    static var previews: some View {
        FirstStaticView()
    }
}
