buster.testCase("Click handler", {
    "communities": {
      "should return false when list is empty and communites are empty": function () {
          refute(CircleHandler.filterCommunitieClick([], []));
      },
      "should return false when list is empty and communites has an element": function () {
          refute(CircleHandler.filterCommunitieClick([], ["ux"]));
      },
      "should return false when list is empty and communites has multiple elements": function () {
          refute(CircleHandler.filterCommunitieClick([], ["ux", "design"]));
      },
      "should return true when list has an element and communites has the same": function () {
          assert(CircleHandler.filterCommunitieClick(["ux"], ["ux"]));
      },
      "should return false when list has an element and communites has none": function () {
          refute(CircleHandler.filterCommunitieClick(["ux"], []));
      },
      "should return false when list has an element and communites has the same and another one": function () {
          refute(CircleHandler.filterCommunitieClick(["ux"], ["ux", "design"]));
      },
      "should return false when list has an element and communites has two different ones": function () {
          refute(CircleHandler.filterCommunitieClick(["ux"], ["health", "design"]));
      },
      "should return true when list has two elements and communites has the same ones (in the same order)": function () {
          assert(CircleHandler.filterCommunitieClick(["ux", "health"], ["ux", "health"]));
      },
      "should return true when list has two elements and communites has the same ones (in different order)": function () {
          assert(CircleHandler.filterCommunitieClick(["ux", "health"], ["health", "ux"]));
      },
      "should return false when list has two elements and communites is empty": function () {
          refute(CircleHandler.filterCommunitieClick(["ux", "health"], []));
      },
      "should return true when list is N/A and communites are empty": function () {
          assert(CircleHandler.filterCommunitieClick(["N/A"], []));
      },
      "should return false when list is N/A and communites are ux": function () {
          refute(CircleHandler.filterCommunitieClick(["N/A"], ["ux"]));
      },
      "should return false when list is N/A and communites are ux and design": function () {
          refute(CircleHandler.filterCommunitieClick(["N/A"], ["ux", "design"]));
      },
      "should return false when list is N/A and health while communites is health": function () {
          refute(CircleHandler.filterCommunitieClick(["N/A", "health"] , ["health"]));
      },
      "should return false when list is N/A and health while communites is empty": function () {
          refute(CircleHandler.filterCommunitieClick(["N/A", "health"] , []));
      },
      "should return true when list is general and while communites is ux": function () {
          assert(CircleHandler.filterCommunitieClick(["general"] , ["ux"]));
      },
      "should return true when list is general and while communites is empty": function () {
          assert(CircleHandler.filterCommunitieClick(["general"] , []));
      },
      "should return true when list is general and while communites is ux and design": function () {
          assert(CircleHandler.filterCommunitieClick(["general"] , ["ux", "design"]));
      },
      "should return true when list is general and management and while communites is ux and management": function () {
          assert(CircleHandler.filterCommunitieClick(["general", "management"] , ["ux", "management"]));
      },
      "should return true when list is general and management while communites is ux design and management": function () {
          assert(CircleHandler.filterCommunitieClick(["general", "management"] , ["ux", "design", "management"]));
      },
      "should return false when list is general and while communites is management": function () {
          refute(CircleHandler.filterCommunitieClick(["general"] , ["management"]));
      }

      


    }
    

})