package org.codingtask.service;

import org.junit.jupiter.api.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the {@link org.codingtask.service.TextAnalyzer} class
 */
class TextAnalyzerTest {

    private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
    private final ByteArrayOutputStream errContent = new ByteArrayOutputStream();
    private final PrintStream originalOut = System.out;
    private final PrintStream originalErr = System.err;

    @BeforeEach
    void setUp() {
        System.setOut(new PrintStream(outContent));
        System.setErr(new PrintStream(errContent));
    }

    @AfterEach
    void tearDown() {
        System.setOut(originalOut);
        System.out.println(outContent.toString());
        System.setErr(originalErr);
    }

    @Test
    void testMissingParamsShouldPrintUsage() {
        TextAnalyzer.main(new String[]{"vowels"});
        List<String> lines = getLines();
        assertEquals(1, lines.size());
        assertTrue(lines.get(0).startsWith("Usage:"));
    }

    @Test
    void testWrongModeParamShouldPrintUsage() {
        TextAnalyzer.main(new String[]{"umlauts", "Hëllö mÿ frïënd"});
        List<String> lines = getLines();
        assertEquals(1, lines.size());
        assertTrue(lines.get(0).startsWith("Usage:"));
    }

    private void checkOccurrences(List<String> lines, List<String> letters, List<Integer> occurrences) {
        IntStream.range(0, lines.size())
                .forEach(i -> {
                    String expected = String.format("Letter '%s' appears %d times", letters.get(i), occurrences.get(i));
                    assertEquals(expected, lines.get(i));
                });
    }


    private List<String> getLines() {
        return List.of(outContent.toString().split("\n"));
    }

    @Nested
    class VowelTest {
        List<String> vowels = List.of("A", "E", "I", "O", "U");

        @Test
        void testPhraseWithVowelsReturnsCorrectOccurrences() {
            TextAnalyzer.main(new String[]{"vowels", "This phrase contains ALL kinds of things!"});
            List<String> lines = getLines();
            assertEquals(vowels.size(), lines.size());
            checkOccurrences(lines, vowels, List.of(3, 1, 4, 2, 0));
        }

        @Test
        void testPhraseWithoutVowelsReturnsNoOccurrences() {
            TextAnalyzer.main(new String[]{"vowels", "Ths phrs cnts ll knds f thngs!"});
            List<String> lines = getLines();
            assertEquals(vowels.size(), lines.size());
            checkOccurrences(lines, vowels, List.of(0, 0, 0, 0, 0));
        }
    }

    @Nested
    class ConsonantTest {
        List<String> consonants = List.of("B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z");
        @Test
        void testPhraseWithConsonantsReturnsCorrectOccurrences() {
            TextAnalyzer.main(new String[]{"consonants", "Test phrase TIME!"});
            List<String> lines = getLines();
            assertEquals(consonants.size(), lines.size());
            checkOccurrences(lines, consonants, List.of(0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 2, 3, 0, 0, 0, 0, 0));
        }

        @Test
        void testPhraseWithoutConsonantsReturnsNoOccurrences() {
            TextAnalyzer.main(new String[]{"consonants", "aua OI"});
            List<String> lines = getLines();
            assertEquals(consonants.size(), lines.size());
            checkOccurrences(lines, consonants, List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        }
    }
}