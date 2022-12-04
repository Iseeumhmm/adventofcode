use std::fs;

struct Overlaps {
    complete_overlap: bool,
    partial_overlap: bool,
}

fn main() {
    let input_string = fs::read_to_string("input.txt").expect("read");
    let sections_vec = &input_string.split("\n").collect::<Vec<&str>>();

    fn comp(assignments: &str)->Overlaps {
        let mut assgn_vec:Vec<Vec<u32>> = Vec::new();
        let mut overlaps = Overlaps {complete_overlap: false, partial_overlap: false};
        for assignment in assignments.split(",").collect::<Vec<&str>>() {
            let text_vec = assignment.split("-").collect::<Vec<&str>>();
            assgn_vec.push(vec![text_vec[0].parse::<u32>().unwrap(), text_vec[1].parse::<u32>().unwrap()]);
        }
        // Check for complete overlap
        if  assgn_vec[0][0] <= assgn_vec[1][0] && 
            assgn_vec[0][1] >= assgn_vec[1][1] ||
            assgn_vec[1][0] <= assgn_vec[0][0] &&
            assgn_vec[1][1] >= assgn_vec[0][1] { overlaps.complete_overlap = true }

        // Check for partial overlap
        if  assgn_vec[0][0] <= assgn_vec[1][1] && 
            assgn_vec[0][1] >= assgn_vec[1][0] ||
            assgn_vec[1][0] <= assgn_vec[0][1] &&
            assgn_vec[1][1] >= assgn_vec[0][1] { overlaps.partial_overlap = true }

        overlaps
    }

    let mut complete_matches:u32 = 0;
    let mut partial_matches:u32 = 0;
    for assignments in sections_vec {
        if comp(assignments).complete_overlap { complete_matches += 1 }
        if comp(assignments).partial_overlap { partial_matches += 1 }
    }

    // Part 1
    println!("Matches: {:?}", complete_matches); 

    // Part 2
    println!("Matches: {:?}", partial_matches);
}
