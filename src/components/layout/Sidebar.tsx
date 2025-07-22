@@ .. @@
       <div className="absolute bottom-0 left-0 right-0 p-4">
-        <button className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105 hover:shadow-sm">
+        <button 
+          onClick={() => {
+            // Handle logout logic here
+            window.location.reload();
+          }}
+          className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105 hover:shadow-sm"
+        >
           <LogOut className="h-6 w-6" />
           <span className="font-semibold">Déconnexion</span>
         </button>