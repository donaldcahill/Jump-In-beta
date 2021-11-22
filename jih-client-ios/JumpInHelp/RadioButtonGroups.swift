//
//  RadioButtonGroups.swift
//  RadioButtonGroups
//
//  Created by Juan Chipoco on 29/08/21.
//
import SwiftUI
import Foundation

enum PaymentOption: String {
    case first = "Male"
    case second = "Female"
}

struct RadioButtonGroups: View {
    let callback: (String) -> ()
    
    @State var selectedId: String = ""
    
    var body: some View {
        VStack {
            radioFirstMajority
            radioSecondMajority
        }
    }
    
    var radioFirstMajority: some View {
        RadioButtonField(
            id: PaymentOption.first.rawValue,
            label: PaymentOption.first.rawValue,
            isMarked: selectedId == PaymentOption.first.rawValue ? true : false,
            callback: radioGroupCallback
        )
    }
    
    var radioSecondMajority: some View {
        RadioButtonField(
            id: PaymentOption.second.rawValue,
            label: PaymentOption.second.rawValue,
            isMarked: selectedId == PaymentOption.second.rawValue ? true : false,
            callback: radioGroupCallback
        )
    }
    
    func radioGroupCallback(id: String) {
        selectedId = id
        callback(id)
    }
}
