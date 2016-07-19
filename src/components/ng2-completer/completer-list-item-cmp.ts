"use strict";
import {Component, Input, OnInit} from "@angular/core";

let template = require("./completer-list-item-cmp.html");

export interface MatchPart {
    isMatch: boolean;
    text: string;
}

@Component({
    selector: "completer-list-item",
    template: template
})
export class CompleterListItemCmp implements OnInit {
    @Input() public text: string;
    @Input() public searchStr: string;
    @Input() public matchClass: string;
    @Input() public type: string;

    private parts: MatchPart[] = [];
    public ngOnInit() {
        let matchStr = this.text.toLowerCase();
        let matchPos = matchStr.indexOf(this.searchStr.toLowerCase());
        let startIndex = 0;
        while (matchPos >= 0) {
            let matchText = this.text.slice(matchPos, matchPos + this.searchStr.length);
            if (matchPos === 0) {
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length;
            } else if (matchPos > 0) {
                let matchPart = this.text.slice(startIndex, matchPos);
                this.parts.push({ isMatch: false, text: matchPart });
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length + matchPart.length;
            }
            matchPos = matchStr.indexOf(this.searchStr.toLowerCase(), startIndex);
        }
        if (startIndex < this.text.length) {
             this.parts.push({ isMatch: false, text: this.text.slice(startIndex, this.text.length) });
        }
    }
}