//*******************************************************
var $grid = apex.region("purchase_req_dtl_dtl").widget();

// গ্রিডের ভেতরের যেকোনো ইনপুট ফিল্ডে চেঞ্জ হলে
$grid.on("change", ".a-GV-cell input", function(event) {
    var affectedRow = $(this).closest('.a-GV-row');
    console.log("সেল এর ডাটা পরিবর্তন হয়েছে");
});

$grid.on("input", ".a-GV-cell input", function(event) {
    var affectedRow = $(this).closest('.a-GV-row');
    console.log(this.value);
});


//*******************************************************
var region = apex.region("purchase_req_dtl_dtl");
var view = region.widget().interactiveGrid("getCurrentView");

if (view.supports.edit) {
    // গ্রিডকে ভিউ মুডে ফোর্স করা যাতে ইনপুট ফিল্ডগুলো টেক্সট আকারে দেখায়
    region.widget().interactiveGrid("getActions").set("edit", false);
    
    // ভিজ্যুয়ালি ইনপুট এলিমেন্টগুলোকে ডিজেবল দেখানো
    region.widget().find(':input').prop('disabled', true);
}

apex.region("purchase_req_dtl_dtl").widget().find(':input, button').prop('disabled', true);

//*******************************************************
var $grid = apex.region("purchase_req_dtl_dtl").widget();
// ১. ইনপুট ও বাটন ডিজেবল করা
$grid.find(':input, button').prop('disabled', true);

// ২. মাউস পয়েন্টার ডিজেবল করা (ক্লিক করা যাবে না)
$grid.css('pointer-events', 'none');

// ৩. কিবোর্ড অ্যাকশন (keydown) ডিজেবল করা
$grid.on('keydown', function(e) {
    e.preventDefault();
    return false;
});

apex.region("purchase_req_dtl_dtl").widget().css('pointer-events', 'auto');
apex.region("purchase_req_dtl_dtl").widget().css('pointer-events', 'none');

// ১. সরাসরি মডেলটি একটি ভেরিয়েবলে নেওয়া
var igModel = apex.region("purchase_req_dtl_dtl").widget().interactiveGrid("getViews", "grid").model;




// ************************** meta data relate (Record, Column) ************************
Oracle APEX maps column names (aliases) to internal keys, and using this method ensures your code will not break if you rearrange or add columns in Page Designer.Here is the updated, clean way to write your code:javascriptconst model = apex.region('purchase_req_dtl_dtl').call('getCurrentView').model;
const columnKey = model.getFieldKey('COLUMN_NAME'); // Replace with your actual SQL column alias

const allPurcharDtlRequiredRowFill = model._data.every(item => item[columnKey]);
Use code with caution.💡 The Recommended APEX API ApproachDirectly accessing _data works, but it utilizes an undocumented, private internal property (_data) that Oracle could change in a future APEX upgrade.The officially supported, safest way to loop through the grid records using column names is by using model.forEach:javascriptconst model = apex.region('purchase_req_dtl_dtl').call('getCurrentView').model;
let allPurcharDtlRequiredRowFill = true;

model.forEach(function(record) {
    // Replace 'COLUMN_NAME' with your exact column alias (case-sensitive)
    const value = model.getValue(record, 'COLUMN_NAME'); 
    
    if (!value) {
        allPurcharDtlRequiredRowFill = false;
    }
});
