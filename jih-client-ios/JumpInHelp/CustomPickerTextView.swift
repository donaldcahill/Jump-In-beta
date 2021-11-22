//
//  CustomPickerTextView.swift
//  CustomPickerTextView
//
//  Created by Juan Chipoco on 26/08/21.
//

import SwiftUI

struct CustomPickerTextView: View {
    @Binding var presentPicker: Bool
    @Binding var fieldString: String
    var placeholder: String
    @Binding var tag: Int
    var selectedTag: Int
    var body: some View {
        TextField(placeholder, text: $fieldString).disabled(true)
            .overlay(
                Button(action: {
                    tag = selectedTag
                    withAnimation {
                        presentPicker = true
                    }
                }) {
                    Rectangle().foregroundColor((Color.clear))
                }
            )
    }
}
