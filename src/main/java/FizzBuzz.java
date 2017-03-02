/**
 * Created by yoichi.kikuchi on 2016/02/09.
 */
public class FizzBuzz {
    public static void main(String[] args) {
        FizzBuzz fizzBuzz = new FizzBuzz();

        for (int i = 1; i <= 100; i++) {
            System.out.println(fizzBuzz.fizzBuzz(i));
        }
    }

    public String fizzBuzz(int number) {
        String fizzBuzz = fizz(number) + buzz(number);
        return fizzBuzz.isEmpty() ? String.valueOf(number) : fizzBuzz;
    }

    public String fizz(int number) {
        return number % 3 == 0 ? "fizz" : "";
    }

    public String buzz(int number) {
        return number % 5 == 0 ? "buzz" : "";
    }
}
