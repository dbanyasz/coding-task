package org.codingtask.service;

import jakarta.validation.constraints.NotNull;

public class AnalysisRequest {

    @NotNull
    TextAnalyzer.AnalysisMode mode;

    @NotNull
    String input;

    public AnalysisRequest(TextAnalyzer.AnalysisMode mode, String input) {
        this.mode = mode;
        this.input = input;
    }

    public TextAnalyzer.AnalysisMode getMode() {
        return mode;
    }

    public String getInput() {
        return input;
    }

    public void setMode(TextAnalyzer.AnalysisMode mode) {
        this.mode = mode;
    }

    public void setInput(String input) {
        this.input = input;
    }
}
