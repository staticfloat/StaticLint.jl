var documenterSearchIndex = {"docs":
[{"location":"#","page":"Home","title":"Home","text":"CurrentModule = StaticLint","category":"page"},{"location":"#StaticLint-1","page":"Home","title":"StaticLint","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(Image: Dev) (Image: Project Status: Active - The project has reached a stable, usable state and is being actively developed.) (Image: ) (Image: codecov.io)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Static Code Analysis for Julia","category":"page"},{"location":"#Installation-and-Usage-1","page":"Home","title":"Installation and Usage","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"StaticLint\")","category":"page"},{"location":"#","page":"Home","title":"Home","text":"using StaticLint","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Documentation: (Image: Dev)","category":"page"},{"location":"#Description-1","page":"Home","title":"Description","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This package supports LanguageServer.jl functionality broadly by:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"linking the file tree of a project\nmarking scopes/namespaces within the syntax tree (ST)\nmarking variable bindings (functions, instances, etc.)\nlinking identifiers (i.e. variable names) to the relevant bindings\nmarking possible errors within the ST","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Identifying and marking errors (5.) is, in general, dependent on steps 1-4. These are achieved through a single pass over the ST of a project. A pass over a single EXPR is achieved through calling a State object on the ST. This State requires an AbstractServer that determines how files within a project are loaded and makes packages available for loading.","category":"page"},{"location":"#Passes-1","page":"Home","title":"Passes","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"For a given experssion x this pass will:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Handle import statements (resolve_import). This either explicitly imports variables into the current state (for statements such as import/using SomeModule: binding1, binding2) or makes the exported bindings of a modules available more generally (e.g. using SomeOtherModule). The availability of includable packages is handled by the getsymbolserver function called on the state.server.\nDetermine whether x introduces a new variable. mark_bindings! performs this and may mark bindings for child nodes of x (e.g. when called on an expression that defines a Function this will mark the arguments of the signature as introducing bindings.)\nAdds any binding associated with x to the variable list of the current scope (add_binding).\nHandles global variables (mark_globals).\nSpecial handling for macros introducing new bindings as necessary, at the moment limited to deprecate, enum, goto, label, and nospecialize.\nAdds new scopes for the interior of x as needed (scopes).\nResolves references for identifiers (i.e. a variable name), macro name, keywords in function signatures and dotted names (e.g. A.B.c). A name is first checked against bindings introduced within a scope then against exported variables of modules loaded into the scope. If this fails to resolve the name this is repeated for the parent scope. References that fail to resolve at this point, and are within a delayed scope (i.e. within a function) are added to a list to be resolved later.\nIf x is a call to include(path_expr) attempt to resolve path_expr to a loadable file from state.server and pass across the files ST (followinclude).\nTraverse across child nodes of x (traverse) in execution order. This means, for example, that in the expression a = b we traverse b then a (ignoring the operator).","category":"page"},{"location":"#Server-1","page":"Home","title":"Server","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"As mentioned, an AbstractServer is required to hold files within a project and provide access to user installed packages. An implementation must support the following functions:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.hasfile(server, path)::Bool : Does the server have a file matching the name path.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.getfile(server, path)::AbstractFile : Retrieves the file path - assumes the server has the file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.setfile(server, path, file)::AbstractFile : Stores file in the server under the name path, returning the file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.canloadfile(server, path)::Bool : Can the server load the file denoted by path, likely from an external source.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.loadfile(server, path)::AbstractFile : Load the file at path from an external source (i.e. the hard drive).","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.getsymbolserver(server)::Dict{String,SymbolServer.ModuleStore} : Retrieve the server's depot of loadable packages.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"An AbstractFile must support the following:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.getpath(file) : Retrieve the path of a file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.getroot(file) : Retrieve the root of a file. The root is the main/first file in a file structure. For example the StaticLint.jl file is the root of all files (including itself) in src/.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.setroot(file, root) : Set the root of a file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.getcst(file) : Retrieve the cst of a file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.setcst(file, cst::CSTParser.EXPR) : Set the cst of a file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.getserver(file) : Retrieve the server holding of a file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.setserver(file, server::AbstractServer) : Set the server of a file.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"StaticLint.scopepass(file, target = nothing(optional)) : Run a full pass on the ST of a project (i.e. ST of all linked files). It is expected that file is the root of the project.","category":"page"},{"location":"syntax/#Syntax-Reference-1","page":"Syntax Reference","title":"Syntax Reference","text":"","category":"section"},{"location":"syntax/#","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [StaticLint]\nPages   = [\"syntax.md\"]","category":"page"},{"location":"syntax/#Main-1","page":"Syntax Reference","title":"Main","text":"","category":"section"},{"location":"syntax/#","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [StaticLint]\nPages   = readdir(\"../src\")","category":"page"},{"location":"syntax/#StaticLint.followinclude-Tuple{Any,StaticLint.State}","page":"Syntax Reference","title":"StaticLint.followinclude","text":"followinclude(x, state)\n\nChecks whether the arguments of a call to include can be resolved to a path. If successful it checks whether a file with that path is loaded on the server   or a file exists on the disc that can be loaded. If this is successful it traverses the code associated with the loaded file.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.traverse-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.traverse","text":"traverse(x, state)\n\nIterates across the child nodes of an EXPR in execution order (rather than storage order) calling state on each node.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.module_safety_trip-Tuple{StaticLint.Scope,Any}","page":"Syntax Reference","title":"StaticLint.module_safety_trip","text":"module_safety_trip(scope::Scope,  visited_scopes)\n\nChecks whether the scope is a module and we've visited it before,  otherwise adds the module to the list.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.new_within_struct-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"StaticLint.new_within_struct","text":"newwithinstruct(x::EXPR)\n\nChecks whether x is a reference to new within a datatype constructor. \n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.resolve_getfield-Tuple{CSTParser.EXPR,StaticLint.Scope,StaticLint.State}","page":"Syntax Reference","title":"StaticLint.resolve_getfield","text":"resolve_getfield(x::EXPR, parent::Union{EXPR,Scope,ModuleStore,Binding}, state::State)::Bool\n\nGiven an expression of the form parent.x try to resolve x. The method called with parent::EXPR resolves the reference for parent, other methods then check whether the Binding/Scope/ModuleStore to which parent points has a field matching x.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scope_exports-Tuple{StaticLint.Scope,String}","page":"Syntax Reference","title":"StaticLint.scope_exports","text":"scope_exports(scope::Scope, name::String)\n\nDoes the scope export a variable called name?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.valofid-Tuple{CSTParser.EXPR}","page":"Syntax Reference","title":"StaticLint.valofid","text":"valofid(x)\n\nReturns the string value of an expression for which isidentifier is true,  i.e. handles NONSTDIDENTIFIERs.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.addmoduletoscope!-Tuple{StaticLint.Scope,Any,Symbol}","page":"Syntax Reference","title":"StaticLint.addmoduletoscope!","text":"addmoduletoscope!(s, m, [mname::Symbol])\n\nAdds module m to the list of used modules in scope s.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.introduces_scope-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.introduces_scope","text":"introduces_scope(x::EXPR, state)\n\nDoes this expression introduce a new scope?\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scopehasbinding-Tuple{StaticLint.Scope,String}","page":"Syntax Reference","title":"StaticLint.scopehasbinding","text":"scopehasbinding(s::Scope, n::String)\n\nChecks whether s has a binding for variable named n.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scopehasmodule-Tuple{StaticLint.Scope,Symbol}","page":"Syntax Reference","title":"StaticLint.scopehasmodule","text":"scopehasmodule(s::Scope, mname::Symbol)::Bool\n\nChecks whether the module mname has been usinged in s.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.scopes-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.scopes","text":"scopes(x::EXPR, state)\n\nCalled when traversing the syntax tree and handles the association of scopes with expressions. On the first pass this will add scopes as necessary, on following passes it empties it. \n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.get_path-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.get_path","text":"get_path(x::EXPR)\n\nUsually called on the argument to include calls, and attempts to determine the path of the file to be included. Has limited support for joinpath calls.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.get_parent_fexpr-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.get_parent_fexpr","text":"get_in_fexpr(x::EXPR, f)\n\nGet the parent of x for which f(parent) == true. (isinfexpr should be called first.)\n\n\n\n\n\n","category":"method"},{"location":"syntax/#StaticLint.is_in_fexpr-Tuple{CSTParser.EXPR,Any}","page":"Syntax Reference","title":"StaticLint.is_in_fexpr","text":"is_in_fexpr(x::EXPR, f)\n\nCheck whether x isa the child of an expression for which f(parent) == true.\n\n\n\n\n\n","category":"method"},{"location":"syntax/#Linting-1","page":"Syntax Reference","title":"Linting","text":"","category":"section"},{"location":"syntax/#","page":"Syntax Reference","title":"Syntax Reference","text":"Modules = [StaticLint]\nPages   = readdir(\"../src/linting\")","category":"page"},{"location":"syntax/#StaticLint.collect_hints","page":"Syntax Reference","title":"StaticLint.collect_hints","text":"collect_hints(x::EXPR, server, missingrefs = :all, isquoted = false, errs = Tuple{Int,EXPR}[], pos = 0)\n\nCollect hints and errors from an expression. missingrefs = (:none, :id, :all) determines whether unresolved identifiers are marked, the :all option will mark identifiers used in getfield calls.\"\n\n\n\n\n\n","category":"function"}]
}
