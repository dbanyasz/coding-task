package org.codingtask;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import org.codingtask.service.AnalysisRequest;
import org.codingtask.service.TextAnalyzer;

import java.util.Map;

@Path("/text-analysis")
public class TextAnalysisResource {

    @Inject
    TextAnalyzer textAnalyzer;

    @POST
    public Map<String, Integer> analyze(@Valid AnalysisRequest analysisRequest) {
        return textAnalyzer.analyze(analysisRequest);
    }
}
