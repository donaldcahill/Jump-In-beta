//
//  SplashView.swift
//  SplashView
//
//  Created by Juan Chipoco on 13/08/21.
//

import SwiftUI

struct SplashView: View {
    var body: some View {
        NavigationView{
            VStack{
                Image("logos-final").resizable().frame(width: 150, height: 150, alignment: .center).background(Color.white)
                    
                    .offset(y: -60)
                    .gesture(DragGesture(minimumDistance: 20, coordinateSpace: .global)
                                .onEnded { value in
                                    let horizontalAmount = value.translation.width as CGFloat
                                    let verticalAmount = value.translation.height as CGFloat
                                    
                                    if abs(horizontalAmount) > abs(verticalAmount) {
                                        print(horizontalAmount < 0 ? "left swipe" : "right swipe")
                                    } else {
                                        print(verticalAmount < 0 ? "up swipe" : "down swipe")
                                    }
                                })
                
                
            }
            
        }
        
    }
}

struct SplashView_Previews: PreviewProvider {
    static var previews: some View {
        SplashView()
    }
}
