use std::fs;

fn main() {

    let contents_string = fs::read_to_string("input.txt").expect("read");
    let array_of_sacks = &contents_string.split("\n").collect::<Vec<&str>>();

    fn convert_to_points(letter:char)->u32 {
        let ascii_value = letter as u32;
        if ascii_value > 91 { ascii_value - 96 } else { ascii_value - 38 }
    }

    fn find_same_value(sack_1: &str, sack_2: &str)->(u32, char) {
        let mut item_value:u32 = 0;
        let mut item_letter:char = '\0';
        for item in sack_1.chars() {
            if sack_2.contains(item) {
                item_value = convert_to_points(item);
                item_letter = item;
            } 
        }
        (item_value, item_letter)
    }

    fn find_same_three(three_sacks:&Vec<&str>)->char {
        let badge_in_second = find_same_value(three_sacks[0], three_sacks[1]).1;
        let badge_in_third = find_same_value(&badge_in_second.to_string(), three_sacks[2]).1;
        if badge_in_second == badge_in_third {
            badge_in_second
        } else {
            let new_string = three_sacks[0].replace(badge_in_second, "");
            let mut new_array = three_sacks.to_vec();
            new_array[0] = &new_string;
            find_same_three(&new_array)
        }
    }

    let mut total:u32 = 0;
    for each in array_of_sacks {
        let split_sack = each.split_at(each.len()/2);
        total += find_same_value(split_sack.0, split_sack.1).0;
    }

    let mut three_sacks:Vec<&str> = Vec::new();

    let mut new_total:u32 = 0;
    for (i, sack) in array_of_sacks.iter().enumerate() {
        three_sacks.push(sack);
        if i.rem_euclid(3) == 2{
            new_total += convert_to_points(find_same_three(&three_sacks));
            three_sacks.clear();
        }
    }

    // Part 1
    println!("First total: {:?}", total);

    // Part 2
    println!("Second Total: {:?}", new_total);
}