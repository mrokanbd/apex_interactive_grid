১. মাস্টার মডেলের নাম (Model ID) পেতে 
ডিটেইল মডেল থেকে সরাসরি তার প্যারেন্ট মডেলের নাম (Identity) জানার জন্য getOption ব্যবহার করুন: 
javascript
const ig = apex.region('work_order_dtl').call('getCurrentView');
const detailModel = ig.model;

// প্যারেন্ট মডেলের আইডি বা নাম রিটার্ন করবে
const parentModelId = detailModel.getOption("parentModel"); 

// এবার প্যারেন্ট মডেল অবজেক্টটি রিলিজ বা রিট্রিভ করতে পারেন
const parentModel = apex.model.get(parentModelId);
সতর্ক হয়ে কোড ব্যবহার করুন।
২. প্যারেন্ট রেকর্ডের আইডি পেতে
ডিটেইল গ্রিডের বর্তমান রো-টি মাস্টার গ্রিডের কোন রেকর্ডের (Row) সাথে যুক্ত, তা জানতে নিচের কোডটি ব্যবহার করুন: 
javascript
const ig = apex.region('work_order_dtl').call('getCurrentView');
const detailModel = ig.model;

// মাস্টার বা প্যারেন্ট রেকর্ডের আইডি রিটার্ন করবে
const parentRecordId = detailModel.getOption("parentRecordId"); 
সতর্ক হয়ে কোড ব্যবহার করুন।
৩. মাস্টার রেকর্ডের সম্পূর্ণ ডেটা পেতে
মাস্টার মডেল এবং প্যারেন্ট রেকর্ড আইডি ব্যবহার করে মূল রেকর্ড অবজেক্টটি এভাবে বের করতে পারেন:
javascript
const ig = apex.region('work_order_dtl').call('getCurrentView');
const detailModel = ig.model;

const parentModelId = detailModel.getOption("parentModel");
const parentRecordId = detailModel.getOption("parentRecordId");

if (parentModelId && parentRecordId) {
    const parentModel = apex.model.get(parentModelId);
    // প্যারেন্ট গ্রিডের নির্দিষ্ট রেকর্ড/রো অবজেক্ট
    const parentRecord = parentModel.getRecord(parentRecordId); 
    
    // উদাহরণ: প্যারেন্ট রেকর্ডের নির্দিষ্ট কোনো কলামের মান দেখতে
    const parentValue = parentModel.getValue(parentRecord, "YOUR_COLUMN_NAME");
    console.log(parentValue);
}



// ১. .weget() এর পরিবর্তে সঠিক মেথড হলো .widget()
const gridWidget = apex.region('work_order_dtl').widget();

if (gridWidget) {
    // ২. jQuery event delegation ব্যবহার করে ইনপুট চেঞ্জ ট্র্যাক করুন
    gridWidget.on('change', 'input, select', function(event) {
        // যে ইনপুট ফিল্ডটি চেঞ্জ হয়েছে সেটি নিন
        const changedInput = $(this); 
        console.log("Changed Value:", changedInput.val());

        // ৩. আপনি যদি বর্তমান একটিভ রেকর্ড এবং মডেল অবজেক্ট পেতে চান:
        const view = apex.region('work_order_dtl').call('getCurrentView');
        const model = view.model;
        
        // বর্তমান একটিভ রো বা রেকর্ড অবজেক্ট বের করুন
        const activeRecord = view.getContextRecord(event.target);
        
        if (activeRecord) {
            console.log("Active Record Data:", activeRecord);
            // উদাহরণস্বরূপ: এই রো-এর আইডি দেখতে
            console.log("Record ID:", model.getRecordId(activeRecord));
        }
    });
}
