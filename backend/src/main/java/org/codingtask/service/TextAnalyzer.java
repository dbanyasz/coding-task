package org.codingtask.service;

import java.util.HashMap;

/**
 * The program for calculating how many times letter in given sentence appears.
 * It gives numbers either for vowels or for consonants based on program input.
 * <p>
 * The first parameter can be 'vowels' or 'consonants'
 * The second parameter is the sentence to be analyzed.
 * <p>
 * Task: Refactor this code to be production ready and create appropriate unit tests.
 */

public class TextAnalyzer {

  public static void main(String[] args) {
    String input = "";
    int numA = 0;
    int numE = 0;
    int numI = 0;
    int numO = 0;
    int numU = 0;
    if (args[0].equals("vowels")) {
      input = args[1];
      char[] chars = input.toCharArray();
      for (int i = 0; i < chars.length; i++) {
        System.out.println(chars[i]);
        if (chars[i] == 'a' || chars[i] == 'A')
          numA++;
        if (chars[i] == 'e' || chars[i] == 'E')
          numE++;
        if (chars[i] == 'i' || chars[i] == 'I')
          numI++;
        if (chars[i] == 'o' || chars[i] == 'O')
          numO++;
        if (chars[i] == 'u' || chars[i] == 'U')
          numU++;
      }
      System.out.println("Letter 'A' appears " + numA + " times");
      System.out.println("Letter 'E' appears " + numE + " times");
      System.out.println("Letter 'I' appears " + numI + " times");
      System.out.println("Letter 'O' appears " + numO + " times");
      System.out.println("Letter 'U' appears " + numU + " times");
    } else if (args[0].equals("consonants")) {
      input = args[1];
      HashMap<String, Integer> consonants = new HashMap<>();
      char[] chars = input.toCharArray();
      for (int i = 0; i < chars.length; i++) {
        if (chars[i] != 'a'
          && chars[i] != 'A'
          && chars[i] != 'e'
          && chars[i] != 'E'
          && chars[i] != 'i'
          && chars[i] != 'I'
          && chars[i] != 'o'
          && chars[i] != 'O'
          && chars[i] != 'u'
          && chars[i] != 'U'
        ) {
          String stringCharacter = String.valueOf(chars[i]).toUpperCase();
          if (consonants.containsKey(stringCharacter)) {
            Integer num = consonants.get(stringCharacter);
            num++;
            consonants.put(stringCharacter, num);
          } else{
            consonants.put(stringCharacter, 1);
          }
        }
      }
      consonants.entrySet().forEach(entrySet -> {
        System.out.println("Letter '" + entrySet.getKey() + "' appears " + entrySet.getValue() + " times");
      });
    }
  }
}
