package org.codingtask.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * The program for calculating how many times letter in given sentence appears.
 * It gives numbers either for vowels or for consonants in the English alphabet based on program input.
 * <p>
 * The first parameter can be 'vowels' or 'consonants' (case-insensitive)
 * The second parameter is the sentence to be analyzed.
 * <p>
 * Task: Refactor this code to be production ready and create appropriate unit tests.
 */

public class TextAnalyzer {
    public enum AnalysisMode {
        VOWELS {
            @Override
            public String filter(String input) {
                return input.replaceAll("[^AEIOU]", "");
            }

            static final List<String> letters = List.of("A", "E", "I", "O", "U");

            @Override
            public List<String> letters() {
                return letters;
            }
        },
        CONSONANTS {
            public String filter(String input) {
                return input.replaceAll("[AEIOU]", "");
            }

            static final List<String> letters = List.of("B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z");

            @Override
            public List<String> letters() {
                return letters;
            }
        };

        public abstract String filter(String input);

        public abstract List<String> letters();
    }


    public void analyze(AnalysisMode mode, String input) {
        String alphabeticalInput = input.toUpperCase().replaceAll("[^A-Z]", "");
        String filteredInput = mode.filter(alphabeticalInput);

        Map<String, Integer> letterOccurrences = mode.letters().stream().collect(Collectors.toMap(
                letter -> letter,
                letter -> 0
        ));

        char[] chars = filteredInput.toCharArray();
        for (char aChar : chars) {
            String stringCharacter = String.valueOf(aChar).toUpperCase();
            letterOccurrences.computeIfPresent(stringCharacter, (letter, occurrences) -> occurrences + 1);
        }
        letterOccurrences
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> {
                    System.out.println("Letter '" + entry.getKey() + "' appears " + entry.getValue() + " times");
                });
    }

    static void usage() {
        System.out.println("Usage: java TextAnalyzer <vowels|consonants> sentence");
    }

    public static void main(String[] args) {
        if (args.length != 2) {
            usage();
            return;
        }

        try {
            AnalysisMode mode = AnalysisMode.valueOf(args[0].toUpperCase());
            new TextAnalyzer().analyze(mode, args[1]);
        } catch (IllegalArgumentException e) {
            usage();
        }
    }
}
