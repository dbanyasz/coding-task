package org.codingtask;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.codingtask.service.AnalysisRequest;
import org.codingtask.service.TextAnalyzer;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
@TestHTTPEndpoint(TextAnalysisResource.class)
class TextAnalysisResourceTest {

    @Test
    void testValidRequestWithSuccessfulResponse() {
        AnalysisRequest request = new AnalysisRequest(TextAnalyzer.AnalysisMode.VOWELS, "AHH, TESTING HURTS!");

        Response response = given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post()
                .then()
                .statusCode(200)
                .extract()
                .response();

        assertEquals(1, response.jsonPath().getInt("A"));
        assertEquals(1, response.jsonPath().getInt("E"));
        assertEquals(1, response.jsonPath().getInt("I"));
        assertEquals(0, response.jsonPath().getInt("O"));
        assertEquals(1, response.jsonPath().getInt("A"));
    }

    @Test
    void testIncompleteRequestBodyWithFailedResponse() {
        AnalysisRequest request = new AnalysisRequest(TextAnalyzer.AnalysisMode.VOWELS, null);

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post()
                .then()
                .statusCode(400);
    }

    @Test
    void testWrongModeInRequestWithFailedResponse() {
        String requestString = new String("{\n" +
                "    \"mode\": \"VOWELZ\",\n" +
                "    \"input\": \"Where's my response?\"\n" +
                "}");

        given()
                .contentType(ContentType.JSON)
                .body(requestString)
                .when().post()
                .then()
                .statusCode(400);
    }
}